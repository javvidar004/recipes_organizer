-- ------------------------------------------------
-- 1. Insert Data into Types (id_type: 1-5)
-- ------------------------------------------------
INSERT INTO Types (name) VALUES
('Breakfast'),
('Lunch'),
('Dinner'),
('Dessert'),
('Snack');

-- ------------------------------------------------
-- 2. Insert Data into Ingredients (id_ingredient: 1-11)
-- ------------------------------------------------
INSERT INTO Ingredients (name, calories, aprox_cost) VALUES
('Chicken Breast', 165.0, 5.50),
('Rice (cooked)', 130.0, 0.50),
('Broccoli', 55.0, 1.20),
('Salmon Fillet', 208.0, 8.00),
('Tomato', 18.0, 0.30),
('Egg', 78.0, 0.40),
('All-Purpose Flour', 364.0, 0.25),
('Granulated Sugar', 387.0, 0.15),
('Dark Chocolate Chips', 546.0, 2.50),
('Spinach (fresh)', 23.0, 1.00),
('Spaghetti Pasta', 150.0, 1.00);

-- ------------------------------------------------
-- 3. Insert Data into Users (id_user: 1-3)
-- Note: id_user = 1 is designated as the public user for public recipes.
-- ------------------------------------------------
INSERT INTO Users (email, u_name, u_lastname, age, password) VALUES
('public@recipe.com', 'Public', 'Curator', 99, 'hashed_public_pw_123'), -- ID 1: Public User
('alice@test.com', 'Alice', 'Smith', 28, 'hashed_alice_pw'),          -- ID 2: Regular User
('bob@test.com', 'Bob', 'Johnson', 45, 'hashed_bob_pw');              -- ID 3: Regular User

-- ------------------------------------------------
-- 4. Insert Data into Recipies (id_recipe: 1-6)
-- ------------------------------------------------
INSERT INTO Recipies (id_user_add, name, description, prep_time, id_type, public) VALUES
-- Recipes added by Public User (ID 1)
(1, 'Grilled Chicken and Rice', 'A simple, classic healthy meal.', '00:30:00', 2, TRUE),  -- R1: Lunch, Public
(1, 'Salmon with Roasted Broccoli', 'Quick and healthy dinner rich in Omega-3.', '00:45:00', 3, TRUE), -- R2: Dinner, Public
(1, 'Scrambled Eggs', 'The fastest protein-packed breakfast.', '00:05:00', 1, TRUE),  -- R3: Breakfast, Public

-- Recipes added by Alice (ID 2)
(2, 'Chocolate Chip Cookies', 'Sweet, chewy, and loaded with chocolate.', '00:20:00', 4, FALSE), -- R4: Dessert, Private
(2, 'Fresh Spinach Salad', 'Light, refreshing salad with a lemon dressing.', '00:10:00', 5, TRUE), -- R5: Snack, Public

-- Recipes added by Bob (ID 3)
(3, 'Spicy Tomato Pasta', 'A simple Italian-inspired pasta dish with a kick.', '00:35:00', 3, FALSE); -- R6: Dinner, Private

-- ------------------------------------------------
-- 5. Insert Data into Ingredient_Recipe (Linking ingredients to recipes)
-- ------------------------------------------------
INSERT INTO Ingredient_Recipe (id_recipe, id_ingredient, cantidad, unidades) VALUES
-- R1: Chicken and Rice (1: Chicken, 2: Rice, 10: Spinach)
(1, 1, 200.0, 'g'),
(1, 2, 150.0, 'g'),
(1, 10, 50.0, 'g'),

-- R2: Salmon with Roasted Broccoli (4: Salmon, 3: Broccoli)
(2, 4, 180.0, 'g'),
(2, 3, 200.0, 'g'),

-- R3: Scrambled Eggs (6: Egg)
(3, 6, 3.0, 'unit'),

-- R4: Chocolate Chip Cookies (7: Flour, 8: Sugar, 9: Chocolate)
(4, 7, 250.0, 'g'),
(4, 8, 100.0, 'g'),
(4, 9, 50.0, 'g'),

-- R5: Fresh Spinach Salad (10: Spinach, 5: Tomato)
(5, 10, 150.0, 'g'),
(5, 5, 2.0, 'unit'),

-- R6: Spicy Tomato Pasta (5: Tomato, 11: Pasta)
(6, 5, 2.0, 'unit'),
(6, 11, 150.0, 'g');

-- ------------------------------------------------
-- 6. Insert Data into Menus (id_menu: 1-2)
-- ------------------------------------------------
INSERT INTO Menus (id_user, start_date, end_date, title) VALUES
(2, '2025-10-01', '2025-10-07', 'Alice''s Weekly Meal Prep'), -- M1: Alice's Menu
(3, '2025-10-15', '2025-10-15', 'Bob''s Quick Daily Plan');     -- M2: Bob's Menu

-- ------------------------------------------------
-- 7. Insert Data into User_Recipe (User favorites/saves of recipes)
-- ------------------------------------------------
INSERT INTO User_Recipe (id_user, id_recipe, favorite, saved) VALUES
-- Alice (ID 2) interactions
(2, 1, TRUE, TRUE),   -- Alice favorites/saves R1 (Public)
(2, 2, FALSE, TRUE),  -- Alice saves R2 (Public)
(2, 6, TRUE, FALSE),  -- Alice favorites R6 (Bob's Private)
(2, 5, FALSE, TRUE),  -- Alice saves R5 (Her own Public)

-- Bob (ID 3) interactions
(3, 3, FALSE, TRUE),  -- Bob saves R3 (Public)
(3, 4, TRUE, TRUE);   -- Bob favorites/saves R4 (Alice's Private)

-- ------------------------------------------------
-- 8. Insert Data into Menu_Recipe (Recipes scheduled in a menu)
-- ------------------------------------------------
INSERT INTO Menu_Recipe (id_menu, id_recipe, day_of_week, meal_type) VALUES
-- M1 (Alice's Weekly Meal Prep)
(1, 1, 'Monday', 'Lunch'),
(1, 2, 'Tuesday', 'Dinner'),
(1, 5, 'Wednesday', 'Lunch'),
(1, 3, 'Thursday', 'Breakfast'),

-- M2 (Bob's Quick Daily Plan)
(2, 3, 'Monday', 'Breakfast'),
(2, 6, 'Monday', 'Dinner');

