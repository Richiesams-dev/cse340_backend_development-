-- Insert data into `account table`
INSERT INTO public.account (
    account_firstname,
    account_lastname,
    account_email,
    account_password
) VALUES (
    'Tony',
    'Stark',
    'tony@starkent.com',
    'Iam1ronM@n',
);

-- Modify data in `account table`
UPDATE public.account 
SET account_type = 'Admin'
WHERE account_id = 1;


-- Delete data in `account table`
DELETE FROM public.account 
WHERE account_id = 1;


-- Update data in `inventory table`
UPDATE public.inventory
SET inv_description = REPLACE(inv_description, 'small interior', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- Join and select data from `inventory and classification table`
SELECT 
    inv.inv_make,
    inv.inv_model,
    cl.classification_name
FROM 
    public.inventory AS inv
INNER JOIN 
    public.classification AS cl
    ON inv.classification_id = cl.classification_id
WHERE 
    cl.classification_name = 'Sport';


-- Update inv_image and inv_thumbnail path in `inventory table`
UPDATE public.inventory
SET
   	inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/')
WHERE 
    inv_image LIKE '/images/%' 
    AND inv_thumbnail LIKE '/images/%'