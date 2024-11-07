# Healthcare System

A healthcare management platform that streamlines patient care, provider services, and administrative operations.

## Table of Contents

- [Features](#features)
- [Components](#components)
- [Installation](#installation)
- [Directory Structure](#directory-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **AI-powered Assistant**: Offers guidance to patients and providers.
- **Medical Records Digilocker**: Securely stores patient records.
- **Automated Result Analysis**: Interprets medical tests.
- **Personalized Chatbot**: Assists patients with basic healthcare queries.
- **Data Encryption**: Secures sensitive data.
- **Patient Portal**: Manage records, appointments, and communication.
- **Provider Portal**: Access and update records, analyze data.
- **Admin Portal**: Manage users, monitor performance, and generate reports.

## Components

- **Admin Portal**: For managing users, permissions, and system reports.
- **Patient Portal**: For patients to manage appointments and records.
- **Provider Portal**: For healthcare providers to manage patient care.

## Installation

### Clone the Repository

```bash
git clone https://github.com/Shival-Gupta/healthcare.git
cd healthcare
```

### Run with Docker Compose

```bash
docker-compose up --build
```

Access the portals:

- **Admin Portal**: `http://localhost:4000`
- **Patient Portal**: `http://localhost:4001`
- **Provider Portal**: `http://localhost:4002`

## Directory Structure

The project is organized as follows:

```
healthcare/
│
├── admin/
│   ├── src/
│   ├── package.json
│   ├── Dockerfile
│   └── ... (other files)
│
├── patient/
│   ├── src/
│   ├── package.json
│   ├── Dockerfile
│   └── ... (other files)
│
├── provider/
│   ├── src/
│   ├── package.json
│   ├── Dockerfile
│   └── ... (other files)
│
├── docker-compose.yml
├── docker-compose.prod.yml
├── LICENSE
├── package.json
└── README.md
```

## Usage

To use the system, access the portals using the provided URLs. For more detailed instructions, refer to the in-app documentation.

## Contributing

Contributions are welcome! Check out the [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 License](./LICENSE).
