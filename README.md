# Healthcare System

## Description

A comprehensive healthcare management system integrating patient care, provider services, and administrative operations.

## Components

- **Admin Portal**: Web application for administrative staff to manage operations.
- **Patient Portal**: Web application for patients to manage appointments and access medical records.
- **Provider Portal**: Web application for healthcare providers to manage patient care.

## Installation

Clone the repository and navigate into it:

```sh
git clone https://github.com/Shival-Gupta/healthcare.git
cd healthcare
```

### Using Docker Compose

To run the entire system with Docker Compose, use the following command:

```sh
docker-compose up --build
```

### Running Individual Services

Each portal can also be run individually with Docker:

#### Admin Portal

```sh
cd admin
docker build -t healthcare-admin .
docker run -p 4000:4000 healthcare-admin
```

Access the Admin Portal at http://localhost:4000

#### Patient Portal

```sh
cd patient
docker build -t healthcare-patient .
docker run -p 4001:4001 healthcare-patient
```

Access the Patient Portal at http://localhost:4001

#### Provider Portal

```sh
cd provider
docker build -t healthcare-provider .
docker run -p 4002:4002 healthcare-provider
```

Access the Provider Portal at http://localhost:4002

## Directory Structure

The project directory is structured as follows:

```
healthcare/
│
├── admin/
│   ├── Dockerfile
│   └── ...
│
├── patient/
│   ├── Dockerfile
│   └── ...
│
├── provider/
│   ├── Dockerfile
│   └── ...
│
├── .dockerignore
├── docker-compose.yml
├── LICENSE
└── README.md
```

## Contributing

Contributions are welcome! Please see the [CONTRIBUTING.md](./CONTRIBUTING.md) file for guidelines.

## License

This project is licensed under the [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International Public License](./LICENSE). See the LICENSE file for more details.

For a comprehensive understanding of the license terms, visit the [Legal Code](https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode).
