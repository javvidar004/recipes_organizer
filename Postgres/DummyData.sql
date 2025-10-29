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
('Lettuce', 15.0, 1.50),
('Carrot', 41.0, 0.20),
('Onion', 40.0, 0.15),
('Garlic', 149.0, 0.25),
('Bell Pepper', 31.0, 0.80),
('Cucumber', 16.0, 0.60),
('Zucchini', 17.0, 0.70),
('Eggplant', 25.0, 0.90),
('Potato', 77.0, 0.10),
('Sweet Potato', 86.0, 0.30),
('Avocado', 160.0, 1.10),
('Asparagus', 20.0, 3.50),
('Celery', 16.0, 0.40),
('Mushroom', 22.0, 2.00),
('Corn', 86.0, 0.50),
('Green Beans', 31.0, 1.30),
('Peas', 81.0, 1.00),
('Cauliflower', 25.0, 1.25),
('Cabbage', 25.0, 0.70),
-- Frutas
('Apple', 52.0, 0.40),
('Banana', 89.0, 0.30),
('Orange', 47.0, 0.35),
('Lemon', 29.0, 0.25),
('Lime', 30.0, 0.30),
('Grapes', 69.0, 2.80),
('Strawberry', 32.0, 3.00),
('Blueberry', 57.0, 4.00),
('Raspberry', 53.0, 4.50),
('Mango', 60.0, 1.50),
-- Proteínas
('Ground Beef (80/20)', 254.0, 6.00),
('Pork Chop', 231.0, 7.00),
('Bacon', 541.0, 8.50),
('Tofu', 76.0, 2.50),
('Lentils (cooked)', 116.0, 0.80),
('Chickpeas (cooked)', 164.0, 0.90),
('Black Beans (cooked)', 132.0, 0.70),
('Shrimp', 99.0, 12.00),
('Cod', 82.0, 9.00),
('Tuna (canned, in water)', 116.0, 1.50),
-- Lácteos y Alternativas
('Milk (Whole)', 61.0, 0.40),
('Cheddar Cheese', 404.0, 5.00),
('Mozzarella Cheese', 280.0, 4.50),
('Parmesan Cheese', 431.0, 9.00),
('Yogurt (plain)', 59.0, 1.20),
('Butter', 717.0, 4.00),
('Olive Oil', 884.0, 3.00),
('Almond Milk', 17.0, 1.80),
('Feta Cheese', 264.0, 5.50),
('Cream Cheese', 342.0, 3.20),
-- Despensa
('Quinoa (cooked)', 120.0, 2.20),
('Oats (rolled)', 389.0, 1.10),
('Bread (slice)', 265.0, 0.20),
('Honey', 304.0, 2.50),
('Maple Syrup', 260.0, 4.00),
('Peanut Butter', 588.0, 3.00),
('Almonds', 579.0, 8.00),
('Walnuts', 654.0, 9.00),
('Cashews', 553.0, 8.50),
('Soy Sauce', 53.0, 1.00),
('Balsamic Vinegar', 88.0, 2.80),
('White Vinegar', 18.0, 0.50),
('Vegetable Oil', 884.0, 0.80),
('Sesame Oil', 884.0, 3.50),
('Ketchup', 112.0, 0.90),
-- Especias y Hierbas
('Salt', 0.0, 0.05),
('Black Pepper', 251.0, 0.20),
('Paprika', 282.0, 0.30),
('Cumin', 375.0, 0.35),
('Oregano (dried)', 265.0, 0.40),
('Basil (fresh)', 23.0, 0.80),
('Parsley (fresh)', 36.0, 0.70),
('Cilantro (fresh)', 23.0, 0.70),
('Thyme (fresh)', 101.0, 0.90),
('Rosemary (fresh)', 131.0, 0.90),
('Ginger (fresh)', 80.0, 0.40),
('Turmeric', 312.0, 0.30),
('Chili Powder', 282.0, 0.30),
('Cinnamon', 247.0, 0.25),
('Nutmeg', 525.0, 0.45),
('Vanilla Extract', 288.0, 1.50),
('Bay Leaf (dried)', 313.0, 0.10),
('Dill (fresh)', 43.0, 0.80),
('Mint (fresh)', 44.0, 0.75),
('Red Pepper Flakes', 318.0, 0.30),
('Onion Powder', 341.0, 0.25),
('Garlic Powder', 331.0, 0.25),
('Coriander (ground)', 298.0, 0.30),
('Mustard (Dijon)', 143.0, 1.10);

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

-- Desayunos (ID Tipo 1)
(1, 'Oatmeal with Berries', 'Warm and comforting oatmeal topped with fresh berries.', '00:10:00', 1, TRUE),
(1, 'Avocado Toast with Egg', 'Toasted bread topped with mashed avocado and a fried egg.', '00:10:00', 1, TRUE),
(1, 'Banana Pancakes', 'Fluffy pancakes made with mashed bananas.', '00:20:00', 1, TRUE),
(1, 'Yogurt Parfait', 'Layers of plain yogurt, granola (oats), and honey.', '00:05:00', 1, TRUE),
(1, 'Tofu Scramble', 'A vegan alternative to scrambled eggs, seasoned with turmeric.', '00:15:00', 1, TRUE),
(1, 'Green Smoothie', 'A healthy blend of spinach, banana, and almond milk.', '00:05:00', 1, TRUE),
(1, 'Breakfast Burrito', 'A tortilla filled with scrambled eggs, black beans, and cheese.', '00:15:00', 1, TRUE),
(1, 'French Toast', 'Bread slices soaked in egg and milk, then fried.', '00:15:00', 1, TRUE),
-- Almuerzos (ID Tipo 2)
(1, 'Quinoa Salad', 'A refreshing salad with quinoa, cucumber, and feta cheese.', '00:15:00', 2, TRUE),
(1, 'Chicken Salad Sandwich', 'Classic chicken salad served between two slices of bread.', '00:20:00', 2, TRUE),
(1, 'Lentil Soup', 'A hearty and nutritious soup made with lentils, carrots, and celery.', '01:00:00', 2, TRUE),
(1, 'Veggie Wrap', 'A tortilla wrap filled with hummus, spinach, and bell peppers.', '00:10:00', 2, TRUE),
(1, 'Tuna Salad', 'Canned tuna mixed with mayonnaise (egg) and celery.', '00:10:00', 2, TRUE),
(1, 'Caprese Salad', 'Simple salad of mozzarella, tomatoes, and basil.', '00:10:00', 2, TRUE),
(1, 'Chicken Caesar Salad', 'Grilled chicken breast on a bed of lettuce with Parmesan.', '00:25:00', 2, TRUE),
(1, 'Black Bean Soup', 'A savory, spiced soup made from black beans and onion.', '00:45:00', 2, TRUE),
(1, 'Stuffed Bell Peppers', 'Bell peppers stuffed with ground beef and rice.', '01:15:00', 2, TRUE),
(1, 'Mushroom Risotto', 'Creamy Italian rice dish made with mushrooms and Parmesan.', '00:45:00', 2, TRUE),
(1, 'BLT Sandwich', 'The classic bacon, lettuce, and tomato sandwich.', '00:10:00', 2, TRUE),
-- Cenas (ID Tipo 3)
(1, 'Spaghetti Bolognese', 'Classic Italian pasta dish with a rich meat sauce.', '01:30:00', 3, TRUE),
(1, 'Beef Stir-Fry', 'Quick stir-fried ground beef with broccoli and soy sauce.', '00:25:00', 3, TRUE),
(1, 'Pork Chops with Apples', 'Seared pork chops served with a sweet apple compote.', '00:40:00', 3, TRUE),
(1, 'Vegetable Curry', 'A fragrant curry with chickpeas, potatoes, and spinach in a coconut milk (milk) base.', '00:45:00', 3, TRUE),
(1, 'Shrimp Scampi with Zoodles', 'Shrimp sauteed in garlic and butter, served over zucchini noodles.', '00:20:00', 3, TRUE),
(1, 'Baked Cod with Asparagus', 'Cod fillet baked with lemon and asparagus.', '00:25:00', 3, TRUE),
(1, 'Tofu and Vegetable Skewers', 'Marinated tofu and vegetable pieces grilled on skewers.', '00:30:00', 3, TRUE),
(1, 'Black Bean Burgers', 'Homemade vegetarian burgers made from black beans and spices.', '00:40:00', 3, TRUE),
(1, 'Chicken Parmesan', 'Breaded chicken breast topped with tomato sauce and mozzarella.', '00:45:00', 3, TRUE),
(1, 'Vegetable Fried Rice', 'A simple stir-fry with rice, peas, carrots, corn, and egg.', '00:20:00', 3, TRUE),
(1, 'Shepherd''s Pie', 'A comforting pie of ground beef and vegetables topped with mashed potatoes.', '01:10:00', 3, TRUE),
(1, 'Fajitas', 'Sizzling chicken strips with bell peppers and onions.', '00:30:00', 3, TRUE),
-- Postres (ID Tipo 4)
(1, 'Apple Crumble', 'Baked apples topped with a crispy oat and butter crumble.', '00:50:00', 4, TRUE),
(1, 'Chocolate Avocado Mousse', 'A healthy, creamy dessert made from avocado and dark chocolate.', '00:10:00', 4, TRUE),
(1, 'Peanut Butter Cookies', 'Simple cookies made with peanut butter, egg, and sugar.', '00:15:00', 4, TRUE),
(1, 'Mango Sorbet', 'A refreshing frozen dessert made from ripe mangoes.', '00:10:00', 4, TRUE),
(1, 'Rice Pudding', 'Creamy pudding made with rice, milk, and cinnamon.', '00:40:00', 4, TRUE),
-- Snacks (ID Tipo 5)
(1, 'Guacamole', 'A dip made from mashed avocados, onion, lime, and cilantro.', '00:10:00', 5, TRUE),
(1, 'Hummus with Carrots', 'Chickpea dip served with carrot sticks.', '00:05:00', 5, TRUE),
(1, 'Apple Slices with Peanut Butter', 'A simple, high-protein snack.', '00:05:00', 5, TRUE),
(1, 'Mixed Nuts', 'A simple blend of almonds, walnuts, and cashews.', '00:01:00', 5, TRUE),
(1, 'Caprese Skewers', 'Cherry tomatoes, mozzarella, and basil drizzled with balsamic.', '00:15:00', 5, TRUE);

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

-- R7: Oatmeal with Berries (62: Oats, 37: Strawberry, 38: Blueberry)
(7, 62, 50.0, 'g'),
(7, 37, 30.0, 'g'),
(7, 38, 30.0, 'g'),
-- R8: Avocado Toast with Egg (63: Bread, 22: Avocado, 6: Egg, 95: Red Pepper Flakes)
(8, 63, 2.0, 'unit'),
(8, 22, 1.0, 'unit'),
(8, 6, 2.0, 'unit'),
(8, 95, 2.0, 'g'),
-- R9: Banana Pancakes (31: Banana, 7: Flour, 6: Egg, 51: Milk)
(9, 31, 2.0, 'unit'),
(9, 7, 150.0, 'g'),
(9, 6, 1.0, 'unit'),
(9, 51, 100.0, 'ml'),
-- R10: Yogurt Parfait (55: Yogurt, 62: Oats, 64: Honey)
(10, 55, 150.0, 'g'),
(10, 62, 30.0, 'g'),
(10, 64, 15.0, 'ml'),
-- R11: Tofu Scramble (44: Tofu, 14: Onion, 87: Turmeric, 76: Salt)
(11, 44, 200.0, 'g'),
(11, 14, 50.0, 'g'),
(11, 87, 3.0, 'g'),
(11, 76, 2.0, 'g'),
-- R12: Green Smoothie (10: Spinach, 31: Banana, 58: Almond Milk)
(12, 10, 60.0, 'g'),
(12, 31, 1.0, 'unit'),
(12, 58, 200.0, 'ml'),
-- R13: Breakfast Burrito (6: Egg, 47: Black Beans, 52: Cheddar, 63: Bread (Tortilla))
(13, 6, 2.0, 'unit'),
(13, 47, 50.0, 'g'),
(13, 52, 30.0, 'g'),
(13, 63, 1.0, 'unit'),
-- R14: French Toast (63: Bread, 6: Egg, 51: Milk, 89: Cinnamon)
(14, 63, 2.0, 'unit'),
(14, 6, 1.0, 'unit'),
(14, 51, 50.0, 'ml'),
(14, 89, 3.0, 'g'),
-- R15: Quinoa Salad (61: Quinoa, 17: Cucumber, 59: Feta, 33: Lemon)
(15, 61, 100.0, 'g'),
(15, 17, 80.0, 'g'),
(15, 59, 40.0, 'g'),
(15, 33, 15.0, 'ml'),
-- R16: Chicken Salad Sandwich (1: Chicken Breast, 24: Celery, 63: Bread, 6: Egg (Mayo))
(16, 1, 150.0, 'g'),
(16, 24, 30.0, 'g'),
(16, 63, 2.0, 'unit'),
(16, 6, 1.0, 'unit'),
-- R17: Lentil Soup (45: Lentils, 13: Carrot, 24: Celery, 14: Onion)
(17, 45, 100.0, 'g'),
(17, 13, 50.0, 'g'),
(17, 24, 50.0, 'g'),
(17, 14, 50.0, 'g'),
-- R18: Veggie Wrap (63: Bread (Tortilla), 10: Spinach, 16: Bell Pepper, 46: Chickpeas (Hummus))
(18, 63, 1.0, 'unit'),
(18, 10, 30.0, 'g'),
(18, 16, 40.0, 'g'),
(18, 46, 50.0, 'g'),
-- R19: Tuna Salad (50: Tuna, 24: Celery, 6: Egg (Mayo))
(19, 50, 100.0, 'g'),
(19, 24, 30.0, 'g'),
(19, 6, 1.0, 'unit'),
-- R20: Caprese Salad (5: Tomato, 53: Mozzarella, 81: Basil)
(20, 5, 2.0, 'unit'),
(20, 53, 125.0, 'g'),
(20, 81, 10.0, 'g'),
-- R21: Chicken Caesar Salad (1: Chicken Breast, 12: Lettuce, 54: Parmesan)
(21, 1, 150.0, 'g'),
(21, 12, 100.0, 'g'),
(21, 54, 20.0, 'g'),
-- R22: Black Bean Soup (47: Black Beans, 14: Onion, 15: Garlic, 79: Cumin)
(22, 47, 200.0, 'g'),
(22, 14, 50.0, 'g'),
(22, 15, 10.0, 'g'),
(22, 79, 5.0, 'g'),
-- R23: Stuffed Bell Peppers (16: Bell Pepper, 41: Ground Beef, 2: Rice)
(23, 16, 2.0, 'unit'),
(23, 41, 150.0, 'g'),
(23, 2, 80.0, 'g'),
-- R24: Mushroom Risotto (2: Rice, 25: Mushroom, 54: Parmesan, 56: Butter)
(24, 2, 100.0, 'g'),
(24, 25, 100.0, 'g'),
(24, 54, 30.0, 'g'),
(24, 56, 15.0, 'g'),
-- R25: BLT Sandwich (63: Bread, 43: Bacon, 12: Lettuce, 5: Tomato)
(25, 63, 2.0, 'unit'),
(25, 43, 30.0, 'g'),
(25, 12, 20.0, 'g'),
(25, 5, 1.0, 'unit'),
-- R26: Spaghetti Bolognese (11: Pasta, 41: Ground Beef, 5: Tomato, 14: Onion)
(26, 11, 150.0, 'g'),
(26, 41, 100.0, 'g'),
(26, 5, 200.0, 'g'),
(26, 14, 50.0, 'g'),
-- R27: Beef Stir-Fry (41: Ground Beef, 3: Broccoli, 70: Soy Sauce, 86: Ginger)
(27, 41, 150.0, 'g'),
(27, 3, 100.0, 'g'),
(27, 70, 15.0, 'ml'),
(27, 86, 5.0, 'g'),
-- R28: Pork Chops with Apples (42: Pork Chop, 30: Apple, 56: Butter, 89: Cinnamon)
(28, 42, 200.0, 'g'),
(28, 30, 1.0, 'unit'),
(28, 56, 15.0, 'g'),
(28, 89, 2.0, 'g'),
-- R29: Vegetable Curry (46: Chickpeas, 20: Potato, 10: Spinach, 51: Milk (Coconut))
(29, 46, 100.0, 'g'),
(29, 20, 100.0, 'g'),
(29, 10, 50.0, 'g'),
(29, 51, 100.0, 'ml'),
-- R30: Shrimp Scampi with Zoodles (48: Shrimp, 18: Zucchini, 15: Garlic, 56: Butter)
(30, 48, 150.0, 'g'),
(30, 18, 200.0, 'g'),
(30, 15, 10.0, 'g'),
(30, 56, 15.0, 'g'),
-- R31: Baked Cod with Asparagus (49: Cod, 23: Asparagus, 33: Lemon, 57: Olive Oil)
(31, 49, 180.0, 'g'),
(31, 23, 100.0, 'g'),
(31, 33, 0.5, 'unit'),
(31, 57, 10.0, 'ml'),
-- R32: Tofu Skewers (44: Tofu, 16: Bell Pepper, 14: Onion, 70: Soy Sauce)
(32, 44, 150.0, 'g'),
(32, 16, 50.0, 'g'),
(32, 14, 50.0, 'g'),
(32, 70, 15.0, 'ml'),
-- R33: Black Bean Burgers (47: Black Beans, 63: Bread (crumbs), 14: Onion, 79: Cumin)
(33, 47, 150.0, 'g'),
(33, 63, 30.0, 'g'),
(33, 14, 40.0, 'g'),
(33, 79, 3.0, 'g'),
-- R34: Chicken Parmesan (1: Chicken Breast, 7: Flour, 6: Egg, 5: Tomato, 53: Mozzarella)
(34, 1, 150.0, 'g'),
(34, 7, 20.0, 'g'),
(34, 6, 1.0, 'unit'),
(34, 5, 100.0, 'g'),
(34, 53, 40.0, 'g'),
-- R35: Vegetable Fried Rice (2: Rice, 28: Peas, 13: Carrot, 26: Corn, 6: Egg)
(35, 2, 150.0, 'g'),
(35, 28, 30.0, 'g'),
(35, 13, 30.0, 'g'),
(35, 26, 30.0, 'g'),
(35, 6, 1.0, 'unit'),
-- R36: Shepherd's Pie (41: Ground Beef, 20: Potato, 13: Carrot, 28: Peas)
(36, 41, 200.0, 'g'),
(36, 20, 150.0, 'g'),
(36, 13, 40.0, 'g'),
(36, 28, 40.0, 'g'),
-- R37: Fajitas (1: Chicken Breast, 16: Bell Pepper, 14: Onion, 88: Chili Powder)
(37, 1, 150.0, 'g'),
(37, 16, 100.0, 'g'),
(37, 14, 50.0, 'g'),
(37, 88, 5.0, 'g'),
-- R38: Apple Crumble (30: Apple, 62: Oats, 56: Butter, 8: Sugar, 89: Cinnamon)
(38, 30, 2.0, 'unit'),
(38, 62, 50.0, 'g'),
(38, 56, 30.0, 'g'),
(38, 8, 30.0, 'g'),
(38, 89, 3.0, 'g'),
-- R39: Chocolate Avocado Mousse (22: Avocado, 9: Dark Chocolate, 65: Maple Syrup)
(39, 22, 1.0, 'unit'),
(39, 9, 50.0, 'g'),
(39, 65, 30.0, 'ml'),
-- R40: Peanut Butter Cookies (66: Peanut Butter, 6: Egg, 8: Sugar)
(40, 66, 100.0, 'g'),
(40, 6, 1.0, 'unit'),
(40, 8, 50.0, 'g'),
-- R41: Mango Sorbet (39: Mango, 8: Sugar, 34: Lime)
(41, 39, 200.0, 'g'),
(41, 8, 30.0, 'g'),
(41, 34, 10.0, 'ml'),
-- R42: Rice Pudding (2: Rice, 51: Milk, 8: Sugar, 89: Cinnamon)
(42, 2, 50.0, 'g'),
(42, 51, 200.0, 'ml'),
(42, 8, 30.0, 'g'),
(42, 89, 3.0, 'g'),
-- R43: Guacamole (22: Avocado, 14: Onion, 34: Lime, 83: Cilantro)
(43, 22, 2.0, 'unit'),
(43, 14, 30.0, 'g'),
(43, 34, 15.0, 'ml'),
(43, 83, 10.0, 'g'),
-- R44: Hummus with Carrots (46: Chickpeas, 15: Garlic, 33: Lemon, 13: Carrot)
(44, 46, 150.0, 'g'),
(44, 15, 5.0, 'g'),
(44, 33, 10.0, 'ml'),
(44, 13, 100.0, 'g'),
-- R45: Apple Slices with Peanut Butter (30: Apple, 66: Peanut Butter)
(45, 30, 1.0, 'unit'),
(45, 66, 30.0, 'g'),
-- R46: Mixed Nuts (67: Almonds, 68: Walnuts, 69: Cashews)
(46, 67, 15.0, 'g'),
(46, 68, 15.0, 'g'),
(46, 69, 15.0, 'g'),
-- R47: Caprese Skewers (5: Tomato, 53: Mozzarella (pearls), 81: Basil, 71: Balsamic Vinegar)
(47, 5, 100.0, 'g'),
(47, 53, 100.0, 'g'),
(47, 81, 10.0, 'g'),
(47, 71, 5.0, 'ml'),
-- R48: Re-using R5 ingredients (Spinach Salad)
(48, 10, 100.0, 'g'),
(48, 5, 1.0, 'unit'),
(48, 57, 10.0, 'ml'),
-- R49: Re-using R6 ingredients (Tomato Pasta)
(49, 11, 100.0, 'g'),
(49, 5, 150.0, 'g'),
(49, 15, 10.0, 'g'),
-- R50: Re-using R1 ingredients (Chicken & Rice)
(50, 1, 150.0, 'g'),
(50, 2, 100.0, 'g'),
(50, 3, 100.0, 'g'),
-- R51: Re-using R2 ingredients (Salmon)
(51, 4, 150.0, 'g'),
(51, 23, 100.0, 'g'),
(51, 57, 5.0, 'ml'),
-- R52: Re-using R3 ingredients (Eggs)
(52, 6, 2.0, 'unit'),
(52, 10, 30.0, 'g'),
(52, 59, 20.0, 'g'),
-- R53: Re-using R4 ingredients (Cookies)
(53, 7, 200.0, 'g'),
(53, 8, 80.0, 'g'),
(53, 9, 40.0, 'g'),
(53, 56, 50.0, 'g');

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

