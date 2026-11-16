-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
    (
        'BrightFuture Builders',
        'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
        'info@brightfuturebuilders.org',
        'brightfuture-logo.png'
    ),
    (
        'GreenHarvest Growers',
        'An urban farming collective promoting food sustainability and education in local neighborhoods.',
        'contact@greenharvest.org',
        'greenharvest-logo.png'
    ),
    (
        'UnityServe Volunteers',
        'A volunteer coordination group supporting local charities and service initiatives.',
        'hello@unityserve.org',
        'unityserve-logo.png'
    );

-- ========================================
-- Project Table
-- ========================================

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES organization(organization_id),
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    project_date DATE NOT NULL
);

INSERT INTO project (organization_id, title, description, location, project_date)
VALUES
    -- BrightFuture Builders (org 1)
    (1, 'Community Center Renovation', 'Repair and repaint the neighborhood community center.', 'Rexburg, ID', '2025-03-15'),
    (1, 'Playground Build', 'Assemble a new playground for the local elementary school.', 'Idaho Falls, ID', '2025-04-05'),
    (1, 'Home Repair Blitz', 'Minor repairs for elderly residents in the community.', 'Rexburg, ID', '2025-04-19'),
    (1, 'Park Bench Restoration', 'Sand and refinish park benches along the greenbelt.', 'Idaho Falls, ID', '2025-05-03'),
    (1, 'Roof Repair Project', 'Patch and repair roofs for families in need.', 'Sugar City, ID', '2025-05-17'),
    -- GreenHarvest Growers (org 2)
    (2, 'Community Garden Planting', 'Plant spring vegetables in the community garden plots.', 'Rexburg, ID', '2025-03-22'),
    (2, 'Compost Workshop', 'Teach residents how to start backyard composting.', 'Rexburg, ID', '2025-04-12'),
    (2, 'Farmers Market Setup', 'Help vendors set up and tear down the weekly market.', 'Idaho Falls, ID', '2025-04-26'),
    (2, 'School Garden Day', 'Build raised beds at a local elementary school.', 'Rexburg, ID', '2025-05-10'),
    (2, 'Harvest Donation Drive', 'Collect and distribute surplus produce to food banks.', 'Idaho Falls, ID', '2025-05-24'),
    -- UnityServe Volunteers (org 3)
    (3, 'Food Bank Sorting', 'Sort and organize donated food at the local food bank.', 'Rexburg, ID', '2025-03-29'),
    (3, 'Senior Center Visit', 'Spend an afternoon visiting with seniors at the center.', 'Idaho Falls, ID', '2025-04-12'),
    (3, 'Clothing Drive', 'Collect, sort, and distribute donated clothing.', 'Rexburg, ID', '2025-04-26'),
    (3, 'Blood Drive Support', 'Assist with check-in and refreshments at the blood drive.', 'Idaho Falls, ID', '2025-05-10'),
    (3, 'Community Cleanup', 'Pick up litter and clean public spaces around town.', 'Rexburg, ID', '2025-05-24');