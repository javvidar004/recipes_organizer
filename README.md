# recipes_organizer

Índice
------
- [Descripción](#desñcripción)
- [Estructura del repositorio](#estructura-del-repositorio)
- [Frontend (Next.js)](#frontend-nextjs)
- [React Query y patrón de datos](#react-query-y-patrón-de-datos)
- [Frontend — notas importantes de implementación](#frontend---notas-importantes-de-implementación)
- [API cliente (Next/lib/api.ts)](#api-cliente-nextlibapits)
- [Backend (Spring Boot)](#backend-spring-boot)
- [Anotaciones Spring y su uso (resumen)](#anotaciones-spring-y-su-uso-resumen)
- [Base de datos — PostgreSQL](#base-de-datos--postgresql)
- [Docker / Compose](#docker--compose)
- [Ejecución local (rápido)](#ejecución-local-rápido)
- [Puntos de depuración y problemas conocidos](#puntos-de-depuración-y-problemas-conocidos)
- [Seguridad y recomendaciones](#seguridad-y-recomendaciones)
- [Próximos pasos sugeridos](#próximos-pasos-sugeridos)
- [Contacto y ayuda](#contacto-y-ayuda)

Descripción
-----------
`recipes_organizer` es una aplicación para organizar recetas, planificar menús semanales y generar listas de compra. Está construida con una arquitectura clásica de 3 capas:

- Frontend: Next.js (app router, React + Tailwind)
- Backend: Spring Boot (REST API, JPA/Hibernate)
- Base de datos: PostgreSQL

Este README resume la estructura del repositorio, los elementos importantes del frontend y backend, cómo ejecutar el proyecto localmente y consejos para depuración y mejoras.

Estructura del repositorio
--------------------------
- `Next/` – aplicación frontend Next.js (app router). Contiene `app/`, `components/`, `lib/`, `public/`, `types/`.
- `SpringBoot/` – servicio REST en Spring Boot (capas: controller, service, repository, entity, dto, security).
- `Postgres/` – SQL de inicialización (`DBData.sql`) y Dockerfile para la base de datos.
- `compose.yml` – orquesta servicios (frontend, api, db) para desarrollo con Docker Compose.

Frontend (Next.js)
------------------
Puntos importantes:

- `app/` - rutas del lado cliente con el nuevo App Router.
	- `app/layout.tsx`: layout raíz que envuelve la app con proveedores (ej. `Providers` que crea el `QueryClient` de React Query).
	- `app/(main)/layout.tsx`: layout para la zona autenticada. Aquí se centraliza la consulta del usuario (`getUserData`) y se expone mediante `UserContext` para evitar múltiples requests redundantes.

- `components/` - componentes reutilizables:
	- `layout/`: `Navbar.tsx`, `LeftSidebar.tsx`, `RightSidebar.tsx`.
	- `menus/`: `Calendar.tsx` (calendario con primera columna lunes y navegación mes), `MealPlanner.tsx` (planificación semanal; usa `formatLocalDate` para evitar errores de zona horaria).
	- `configurations/`: `ProfileForm.tsx`, `PasswordForm.tsx`.
	- `dashboard/`, `recipes/`, `shopping-list/`, `search/`.

- `lib/`:
	- `api.ts`: funciones que hablan con la API (`axios` instance + `fetch` para endpoints concretos). Maneja `API_BASE_URL`, guarda Authorization header tras login y guarda `userId` en cookie.
	- `userContext.tsx`: contexto para compartir el usuario autenticado en toda la UI.
	- `mockData.tsx`: datos mock para desarrollo.

React Query y patrón de datos
----------------------------
- Se usa `@tanstack/react-query` para caché y reintentos. En `app/(main)/layout.tsx` se ejecuta una única consulta `useQuery(['user'], getUserData)` y se configura `staleTime` y `refetchOnWindowFocus` para evitar refetches innecesarios.
- Beneficio: minimiza llamadas repetidas a `/api/users/{id}` y reduce la carga en el backend.

Frontend — notas importantes de implementación
-------------------------------------------
- Evitar `toISOString().slice(0,10)` para fechas: provoca off-by-one en zonas horarias no-UTC. Usar un helper `formatLocalDate(d: Date)` que formatee `YYYY-MM-DD` con `getFullYear()/getMonth()+1/getDate()`.
- Centralizar la consulta del usuario en `layout` y exponerla por `UserContext` o props para evitar N peticiones desde distintos componentes.
- Protección de rutas: `app/(main)/layout.tsx` comprueba `localStorage.token` y cookie `userId` y redirige a `/` si faltan, además redirige si `getUserData` devuelve error.

API cliente (`Next/lib/api.ts`)
-----------------------------
- Usa `axios` para la mayoría de endpoints mediante una instancia `apiClient` con `baseURL` y `Content-Type: application/json`.
- `userSignIn` hace POST a `/auth/login`, guarda `Authorization` en `apiClient.defaults.headers.common['Authorization']` y extrae `userId` del JWT (si está) para almacenarlo en cookie.
- Algunas funciones (por ejemplo `getMealsForDate`, `upsertAllMeals`) usan `fetch` directamente para manejar respuestas 204 y casos donde construimos `fetch` con cabeceras manuales.
- El código lee `userId` desde cookie para construir rutas de tipo `/menus/{userId}`.

Backend (Spring Boot)
---------------------
Estructura principal:

- `controller/` – clases con `@RestController` que exponen endpoints (mapas `@GetMapping`, `@PostMapping`, `@PutMapping`).
- `service/` – lógica de negocio marcada con `@Service`. Aquí se orquestan repositorios y se usan `@Transactional` cuando procede.
- `repository/` – interfaces que extienden `JpaRepository` para acceso a datos.
- `entity/` – entidades JPA con `@Entity`, `@Id`, `@GeneratedValue`.
- `dto/` – objetos Request/Response para desacoplar la API del modelo de persistencia.

Anotaciones Spring y su uso (resumen):

- `@SpringBootApplication`: punto de arranque de la app.
- `@RestController`: controlador REST que devuelve JSON.
- `@RequestMapping`, `@GetMapping`, `@PostMapping`, `@PutMapping`: mapeo de rutas HTTP.
- `@Service`: marca la capa de negocio (beans manejados por Spring).
- `@Repository`: utilizado por repositorios (manejo de excepciones, inyección).
- `@Entity`, `@Id`, `@GeneratedValue`: mapeo JPA a tablas.
- `@Transactional` / `@Transactional(readOnly = true)`: gestión de transacciones; `readOnly` optimiza para consultas.
- `@Configuration`, `@Bean`: definiciones de configuración (ej. seguridad, beans auxiliares).

Base de datos — PostgreSQL
------------------------
- `Postgres/DBData.sql` proporciona script para crear tablas y datos iniciales.
- `application.properties` contiene la conexión (`spring.datasource.url`, `username`, `password`).
- En desarrollo se usa `docker-compose` para levantar Postgres y Spring Boot juntos; en producción separar credenciales y usar variables de entorno.

Docker / Compose
-----------------
- `compose.yml` orquesta `api`, `db` y `next` (si está configurado). Esto facilita correr todo localmente con `docker compose up --build`.

Ejecución local (rápido)
-----------------------
1) Levantar servicios con Docker Compose (si lo usas):
```powershell
cd "c:\Users\jdeal\Documents\5to semestre\Web\Proyecto\Completo\recipes_organizer"
docker compose up --build
```

2) O correr sólo el frontend en modo dev:
```powershell
cd "c:\Users\jdeal\Documents\5to semestre\Web\Proyecto\Completo\recipes_organizer\Next"
npm install
npm run dev
```

3) Backend (desde `SpringBoot/`) con Gradle:
```powershell
cd "c:\Users\jdeal\Documents\5to semestre\Web\Proyecto\Completo\recipes_organizer\SpringBoot"
.\gradlew bootRun
```

---

Detalles técnicos y ejemplos de código
------------------------------------
En esta sección explico con ejemplos cómo se crearon los DTOs en el backend, cómo se serializan/transportan como JSON y cómo el frontend define las mismas estructuras en TypeScript para consumir la API.

1) DTOs en Spring Boot (backend)
--------------------------------
Los DTOs (Data Transfer Objects) se usan para definir el contrato REST (qué espera/entrega la API) sin exponer directamente las entidades JPA. Ejemplo de un DTO de respuesta para un `Menu`:

```java
// src/main/java/com/example/api/dto/Responses/MenuResponse.java
public class MenuResponse {
		private Long id;
		private LocalDate date; // fecha del día
		private List<MealEntryResponse> breakfast;
		private List<MealEntryResponse> lunch;
		private List<MealEntryResponse> dinner;

		// getters / setters / constructores
}

public class MealEntryResponse {
		private Long recipeId;
		private String recipeName;
		private Integer people;
		// getters/setters
}
```

Mapping en el `Service` (ejemplo simple):

```java
// MenuService.java (fragmento)
public MenuResponse mapToResponse(Menu menu) {
		MenuResponse res = new MenuResponse();
		res.setId(menu.getId());
		res.setDate(menu.getDate());
		res.setBreakfast(menu.getBreakfast().stream()
				.map(mr -> new MealEntryResponse(mr.getRecipe().getId(), mr.getRecipe().getName(), mr.getPeople()))
				.collect(Collectors.toList()));
		// similar para lunch/dinner
		return res;
}
```

Controller que devuelve DTOs:

```java
@RestController
@RequestMapping("/api/menus")
public class MenusController {
	private final MenuService menuService;
	@GetMapping("/{userId}")
	public ResponseEntity<MenuResponse> getMenu(@PathVariable Long userId, @RequestParam String date) {
		MenuResponse resp = menuService.getMenuForUserAndDate(userId, LocalDate.parse(date));
		return ResponseEntity.ok(resp);
	}
}
```

Notas:
- Serialización JSON: Spring Boot usa Jackson por defecto. Puedes usar `@JsonProperty` para renombrar campos o `@JsonFormat` para controlar el formato de fechas.

2) Evitar N+1 desde el backend (ejemplo con `@EntityGraph` y `JOIN FETCH`)
---------------------------------------------------------------
Si al cargar un `Menu` ves muchas queries sobre `Ingredient_Recipe` u otras relaciones, es porque JPA está cargando relaciones perezosamente por cada entidad. Dos soluciones comunes:

- `@EntityGraph` en repositorio:

```java
// MenuRepository.java
@EntityGraph(attributePaths = {"mealEntries","mealEntries.recipe","mealEntries.recipe.ingredients"})
Optional<Menu> findByIdAndUserId(Long id, Long userId);
```

- `@Query` con `JOIN FETCH`:

```java
@Query("select m from Menu m left join fetch m.mealEntries me left join fetch me.recipe r where m.id = :id and m.user.id = :userId")
Optional<Menu> findByIdWithEntries(@Param("id") Long id, @Param("userId") Long userId);
```

Ambas opciones permiten que JPA traiga relaciones necesarias en una sola consulta SQL.

3) DTOs en el frontend (TypeScript) — mismo contrato JSON
--------------------------------------------------------
En el frontend definimos interfaces TypeScript que coincidan con los DTOs del backend para seguridad de tipos y autocompletado.

Ejemplo en `Next/types/index.ts`:

```ts
export interface MealEntryResponse {
	recipeId: number;
	recipeName?: string;
	people?: number;
}

export interface MenuResponse {
	id: number;
	date: string; // YYYY-MM-DD
	breakfast?: MealEntryResponse[];
	lunch?: MealEntryResponse[];
	dinner?: MealEntryResponse[];
}
```

4) Ejemplo de request / response JSON
------------------------------------
Petición para obtener menús de la semana (el frontend envía `startDate`, `endDate`, `date`):

Request body (POST a `/api/menus/{userId}`):

```json
{
	"startDate": "2025-11-17",
	"endDate": "2025-11-23",
	"date": "2025-11-23"
}
```

Respuesta (ejemplo):

```json
{
	"breakfast": [{"recipeId": 1, "recipeName": "Tostadas", "people": 2}],
	"lunch": [{"recipeId": 5, "recipeName": "Ensalada", "people": 3}],
	"dinner": []
}
```

Ejemplo de payload para `upsertAllMeals` (frontend → backend):

```json
{
	"start_date_week": "2025-11-17",
	"end_date_week": "2025-11-23",
	"date": 23,
	"meals": {
		"breakfast": [{"recipeId": 1, "people": 2}],
		"lunch": [],
		"dinner": [{"recipeId": 3, "people": 4}]
	}
}
```

5) Consumo en el frontend (ejemplo actual en `Next/lib/api.ts`)
-----------------------------------------------------------
La función `getMealsForDate` pide el menú semanal al backend; lee `userId` desde cookie y hace `fetch`:

```ts
export const getMealsForDate = async (startDate: string, endDate: string, date: string): Promise<any> => {
	const match = document.cookie.match('(?:^|; )userId=([^;]+)');
	const userId = match && match[1] ? decodeURIComponent(match[1]) : null;
	const res = await fetch(`${API_BASE_URL}/menus/${userId}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', 'Authorization': String(apiClient.defaults.headers.common['Authorization'] ?? '') },
		body: JSON.stringify({ startDate, endDate, date })
	});
	return await res.json();
}
```

6) Mapeo entity → DTO en servicios (ejemplo práctico)
----------------------------------------------------
En `MenuService` conviene mapear entidades a DTOs con streams o con librerías como MapStruct para evitar código repetido.

Ejemplo manual:

```java
public MenuResponse getMenuForUserAndDate(Long userId, LocalDate date) {
	Menu menu = menuRepository.findByUserIdAndDate(userId, date)
			.orElseThrow(() -> new NotFoundException("Menu not found"));
	return mapToResponse(menu);
}
```

7) Validación y seguridad en el backend
-------------------------------------
- Validar que el `userId` en la URL coincide con el `userId` del token JWT (no confiar en un valor enviado por el cliente).
- Usar `@PreAuthorize` / `@RolesAllowed` cuando sea necesario para controlar accesos por roles.


API (Spring Boot) — Estructura detallada por capas
-------------------------------------------------
En esta sección se detalla la estructura de la API (carpeta `SpringBoot/`) y el papel de cada capa: configuración, controladores, DTOs, entidades, excepciones, repositorios, seguridad y servicios. Incluyo ejemplos de código y explicaciones de por qué se diseñó así.

1) Configuraciones (`config`)
-----------------------------
Función: definir beans, conversores, configuración de seguridad, CORS, y componentes reutilizables por la aplicación.

Ejemplo: configuración de CORS y mapeo de recursos simple.

```java
// src/main/java/com/example/api/config/WebConfig.java
@Configuration
public class WebConfig implements WebMvcConfigurer {
		@Override
		public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("*")
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
						.allowedHeaders("*")
						.allowCredentials(true);
		}
}
```

Explicación: centralizar estas políticas evita configuraciones duplicadas y facilita adaptar CORS por ambientes (dev/prod).

2) Controladores (`controller`)
--------------------------------
Función: exponer endpoints REST, recibir y validar requests, devolver DTOs o estados HTTP. Los controladores deben ser delgados: delegan la lógica a los servicios.

Ejemplo: controlador para menús (fragmento).

```java
@RestController
@RequestMapping("/api/menus")
public class MenusController {
		private final MenuService menuService;

		public MenusController(MenuService menuService) {
				this.menuService = menuService;
		}

		@PostMapping("/{userId}")
		public ResponseEntity<MenuResponse> getMenuForWeek(@PathVariable Long userId, @RequestBody WeekRequest req) {
				MenuResponse resp = menuService.getMenuForWeek(userId, req.getStartDate(), req.getEndDate(), req.getDate());
				return ResponseEntity.ok(resp);
		}
}
```

Detalles: validar parámetros, convertir formatos (p. ej. `String` → `LocalDate`) y devolver códigos HTTP correctos (200, 204, 400, 401, 404).

3) DTOs (`dto`) — Requests y Responses
--------------------------------------
Función: definir la forma de datos que entra y sale por la API. Los DTOs desacoplan la persistencia (Entities) de la representación en la API.

Ejemplo de request y response DTOs:

```java
// WeekRequest.java
public class WeekRequest {
		private String startDate; // YYYY-MM-DD
		private String endDate;
		private String date; // selected day
		// getters/setters
}

// MenuResponse.java (ya mostrado arriba)
```

Pauta: usar validaciones con `javax.validation` (`@NotNull`, `@Size`, `@Pattern`) y anotar parámetros en controladores con `@Valid`.

4) Entidades (`entity`)
------------------------
Función: mapeo ORM JPA/Hibernate de tablas a objetos Java. Aquí modelas relaciones (`@OneToMany`, `@ManyToOne`, `@ManyToMany`).

Ejemplo simplificado de `Menu` y `IngredientRecipe`:

```java
@Entity
public class Menu {
	@Id @GeneratedValue
	private Long id;
	private LocalDate date;

	@OneToMany(mappedBy = "menu", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<MenuRecipe> mealEntries = new ArrayList<>();
	// getters/setters
}

@Entity
public class MenuRecipe {
	@EmbeddedId
	private MenuRecipeId id;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("menuId")
	private Menu menu;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("recipeId")
	private Recipe recipe;

	private Integer people;
}
```

Consideraciones:
- Usar `fetch = FetchType.LAZY` por defecto y controlar carga mediante las consultas (`JOIN FETCH` o `@EntityGraph`).
- Evitar exponer entidades directamente en los controladores (usar DTOs).

5) Repositorios (`repository`)
--------------------------------
Función: abstracción de acceso a datos. Las interfaces extienden `JpaRepository` y definen consultas personalizadas cuando es necesario.

Ejemplo:

```java
public interface MenuRepository extends JpaRepository<Menu, Long> {
	Optional<Menu> findByUserIdAndDate(Long userId, LocalDate date);

	@EntityGraph(attributePaths = {"mealEntries","mealEntries.recipe"})
	Optional<Menu> findWithEntriesById(Long id);
}
```

Detalles: usar `@EntityGraph` para evitar N+1; cuando las consultas son complejas, escribir `@Query` con `JOIN FETCH` y devolver DTOs directamente si conviene.

6) Manejo de excepciones (`exception` / `advice`)
-------------------------------------------------
Función: centralizar el tratamiento de errores y mapear excepciones a respuestas HTTP coherentes.

Ejemplo global usando `@ControllerAdvice`:

```java
@ControllerAdvice
public class RestExceptionHandler {
	@ExceptionHandler(NotFoundException.class)
	public ResponseEntity<ErrorResponse> handleNotFound(NotFoundException ex) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("NOT_FOUND", ex.getMessage()));
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponse> handleGeneric(Exception ex) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("ERROR", "Internal server error"));
	}
}
```

Beneficio: respuestas consistentes, logging centralizado y menos duplicación de try/catch en controladores.

7) Servicios (`service`)
------------------------
Función: implementar la lógica de negocio, orquestar repositorios, manejar transacciones y aplicar reglas.

Ejemplo resumido:

```java
@Service
public class MenuService {
	private final MenuRepository menuRepository;

	public MenuService(MenuRepository menuRepository) {
		this.menuRepository = menuRepository;
	}

	@Transactional(readOnly = true)
	public MenuResponse getMenuForWeek(Long userId, String startIso, String endIso, String dateIso) {
		LocalDate start = LocalDate.parse(startIso);
		LocalDate end = LocalDate.parse(endIso);
		// lógica para obtener/crear menú semanal y mapear a DTO
		Menu menu = menuRepository.findByUserIdAndDate(userId, LocalDate.parse(dateIso)).orElse(new Menu());
		return mapToResponse(menu);
	}
}
```

Notas: marcar `@Transactional` en métodos que modifican datos; `readOnly=true` para consultas, reduce overhead.

8) Seguridad (`security`)
-------------------------
Función: proteger endpoints, validar JWT, configurar filtros y reglas de autorización.

Ejemplo (esquema simplificado):

```java
@Configuration
public class SecurityConfig {
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtFilter jwtFilter) throws Exception {
		http.csrf().disable()
				.authorizeRequests()
				.antMatchers("/auth/**").permitAll()
				.antMatchers("/api/**").authenticated()
				.and().addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
}
```

El `JwtFilter` valida el token, extrae claims y coloca una `Authentication` en el `SecurityContext`.