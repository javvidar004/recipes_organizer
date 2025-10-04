-- Create the Types table 
CREATE TABLE Types ( 
    id_type SERIAL PRIMARY KEY, 
    name VARCHAR(255) ); 
    
-- Create the Ingredients table 
CREATE TABLE Ingredients ( 
    id_ingredient SERIAL PRIMARY KEY, 
    name VARCHAR(100), 
    calories DOUBLE PRECISION, 
    aprox_cost DOUBLE PRECISION ); 

-- Create the Users table 
CREATE TABLE Users ( 
    id_user SERIAL PRIMARY KEY, 
    email VARCHAR(50) NOT NULL, 
    u_name VARCHAR(50), 
    u_lastname VARCHAR(75), 
    age INT, 
    password VARCHAR(128) 
); 

-- Create the Recipies table 
CREATE TABLE Recipies ( 
    id_recipe SERIAL PRIMARY KEY, 
    id_user_add INT REFERENCES Users(id_user), 
    name VARCHAR(200), 
    description VARCHAR(255), 
    prep_time TIME, 
    id_type INT REFERENCES Types(id_type), 
    public BOOLEAN 
); 

-- Create the Ingredient_Recipe table 
CREATE TABLE Ingredient_Recipe ( 
    id_recipe INT REFERENCES Recipies(id_recipe), 
    id_ingredient INT REFERENCES Ingredients(id_ingredient), 
    cantidad DOUBLE PRECISION, 
    unidades VARCHAR(5), 
    PRIMARY KEY (id_recipe, id_ingredient) 
); 

-- Create the User_Recipe table 
CREATE TABLE User_Recipe ( 
    id_user INT REFERENCES Users(id_user), 
    id_recipe INT REFERENCES Recipies(id_recipe), 
    favorite BOOLEAN, 
    saved BOOLEAN, 
    PRIMARY KEY (id_user, id_recipe) 
); 

-- Create the Menus table 
CREATE TABLE Menus ( 
    id_menu SERIAL PRIMARY KEY, 
    id_user INT REFERENCES Users(id_user), 
    start_date DATE, 
    end_date DATE, 
    title VARCHAR(100) 
); 

-- Create the Menu_Recipe table 
CREATE TABLE Menu_Recipe ( 
    id_menu INT REFERENCES Menus(id_menu), 
    id_recipe INT REFERENCES Recipies(id_recipe), 
    day_of_week VARCHAR(10), 
    meal_type VARCHAR(20), 
    PRIMARY KEY (id_menu, id_recipe) 
);  
