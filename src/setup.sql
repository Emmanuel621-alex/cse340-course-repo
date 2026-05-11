CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);
INSERT INTO organizations (name, description, contact_email, logo_filename)
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

CREATE TABLE service_projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL 
);
-- Insert Service Projects for BrightFuture Builders (organization_id = 1)

INSERT INTO service_projects
(organization_id, title, description, location, project_date)
VALUES
(
    1,
    'Community Bridge Renovation',
    'Renovating an old community bridge to improve transportation and safety.',
    'Lagos, Nigeria',
    '2026-06-10'
),
(
    1,
    'Solar Classroom Construction',
    'Building solar-powered classrooms for underserved schools.',
    'Abuja, Nigeria',
    '2026-07-15'
),
(
    1,
    'Clean Water Borehole Project',
    'Installing boreholes to provide clean drinking water to rural communities.',
    'Ibadan, Nigeria',
    '2026-08-05'
),
(
    1,
    'Eco Housing Initiative',
    'Constructing affordable eco-friendly housing units.',
    'Port Harcourt, Nigeria',
    '2026-09-12'
),
(
    1,
    'Community Road Repair',
    'Repairing damaged roads to improve local transportation.',
    'Enugu, Nigeria',
    '2026-10-20'
);

-- Insert Service Projects for GreenHarvest Growers (organization_id = 2)

INSERT INTO service_projects
(organization_id, title, description, location, project_date)
VALUES
(
    2,
    'Urban Garden Training',
    'Teaching residents how to grow vegetables in urban spaces.',
    'Kano, Nigeria',
    '2026-06-18'
),
(
    2,
    'School Farming Program',
    'Creating educational farming gardens in schools.',
    'Jos, Nigeria',
    '2026-07-08'
),
(
    2,
    'Community Compost Initiative',
    'Promoting composting and organic waste recycling.',
    'Benin City, Nigeria',
    '2026-08-14'
),
(
    2,
    'Neighborhood Tree Planting',
    'Planting trees to improve environmental sustainability.',
    'Abeokuta, Nigeria',
    '2026-09-02'
),
(
    2,
    'Food Sustainability Workshop',
    'Hosting workshops on sustainable agriculture and nutrition.',
    'Ilorin, Nigeria',
    '2026-10-11'
);

-- Insert Service Projects for UnityServe Volunteers (organization_id = 3)

INSERT INTO service_projects
(organization_id, title, description, location, project_date)
VALUES
(
    3,
    'Charity Food Distribution',
    'Distributing food supplies to low-income families.',
    'Owerri, Nigeria',
    '2026-06-25'
),
(
    3,
    'Youth Mentorship Program',
    'Connecting volunteers with teenagers for mentorship and guidance.',
    'Uyo, Nigeria',
    '2026-07-19'
),
(
    3,
    'Hospital Support Outreach',
    'Providing volunteer assistance to local hospitals.',
    'Calabar, Nigeria',
    '2026-08-09'
),
(
    3,
    'Community Cleanup Campaign',
    'Organizing volunteers to clean public spaces and streets.',
    'Akure, Nigeria',
    '2026-09-16'
),
(
    3,
    'Back-to-School Donation Drive',
    'Collecting and distributing school supplies for children.',
    'Ado-Ekiti, Nigeria',
    '2026-10-28'
);
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE project_categories (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
	PRIMARY KEY (project_id, category_id),
	CONSTRAINT fk_project
	FOREIGN KEY (project_id)
    REFERENCES service_projects(project_id)
    ON DELETE CASCADE,
	CONSTRAINT fk_category
    FOREIGN KEY (category_id)
    REFERENCES categories(category_id)
	ON DELETE CASCADE );

INSERT INTO categories (name)
VALUES
('Community Development'),
('Environmental Sustainability'),
('Education and Mentorship');

INSERT INTO project_categories (project_id, category_id)
VALUES
(1, 1),
(2, 3),
(3, 1),
(4, 2),
(5, 3),
(1, 2),
(2, 1),
(3, 3),
(4, 1),
(5, 2);