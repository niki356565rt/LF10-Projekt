-- Smart Restaurant – Datenbankschema nach dem relationalen Modell in 3NF
-- Zielsystem: MariaDB/MySQL (XAMPP)

CREATE DATABASE IF NOT EXISTS smart_restaurant
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE smart_restaurant;

CREATE TABLE IF NOT EXISTS rolle (
    rolle_id INTEGER NOT NULL AUTO_INCREMENT,
    bezeichnung VARCHAR(30) NOT NULL,
    CONSTRAINT pk_rolle PRIMARY KEY (rolle_id),
    CONSTRAINT uq_rolle_bezeichnung UNIQUE (bezeichnung)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS tischstatus (
    tischstatus_id INTEGER NOT NULL AUTO_INCREMENT,
    bezeichnung VARCHAR(20) NOT NULL,
    CONSTRAINT pk_tischstatus PRIMARY KEY (tischstatus_id),
    CONSTRAINT uq_tischstatus_bezeichnung UNIQUE (bezeichnung)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS bestellstatus (
    bestellstatus_id INTEGER NOT NULL AUTO_INCREMENT,
    bezeichnung VARCHAR(30) NOT NULL,
    CONSTRAINT pk_bestellstatus PRIMARY KEY (bestellstatus_id),
    CONSTRAINT uq_bestellstatus_bezeichnung UNIQUE (bezeichnung)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS zubereitungsort (
    zubereitungsort_id INTEGER NOT NULL AUTO_INCREMENT,
    bezeichnung VARCHAR(20) NOT NULL,
    CONSTRAINT pk_zubereitungsort PRIMARY KEY (zubereitungsort_id),
    CONSTRAINT uq_zubereitungsort_bezeichnung UNIQUE (bezeichnung)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS mitarbeiter (
    mitarbeiter_id INTEGER NOT NULL AUTO_INCREMENT,
    rolle_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    benutzername VARCHAR(50) NOT NULL,
    aktiv BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT pk_mitarbeiter PRIMARY KEY (mitarbeiter_id),
    CONSTRAINT uq_mitarbeiter_benutzername UNIQUE (benutzername),
    CONSTRAINT fk_mitarbeiter_rolle FOREIGN KEY (rolle_id)
        REFERENCES rolle (rolle_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS tisch (
    tisch_id INTEGER NOT NULL AUTO_INCREMENT,
    tischstatus_id INTEGER NOT NULL,
    tischnummer INTEGER NOT NULL,
    kapazitaet INTEGER NOT NULL,
    CONSTRAINT pk_tisch PRIMARY KEY (tisch_id),
    CONSTRAINT uq_tisch_tischnummer UNIQUE (tischnummer),
    CONSTRAINT ck_tisch_kapazitaet CHECK (kapazitaet BETWEEN 2 AND 8),
    CONSTRAINT fk_tisch_tischstatus FOREIGN KEY (tischstatus_id)
        REFERENCES tischstatus (tischstatus_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS kategorie (
    kategorie_id INTEGER NOT NULL AUTO_INCREMENT,
    zubereitungsort_id INTEGER NOT NULL,
    bezeichnung VARCHAR(50) NOT NULL,
    CONSTRAINT pk_kategorie PRIMARY KEY (kategorie_id),
    CONSTRAINT uq_kategorie_bezeichnung UNIQUE (bezeichnung),
    CONSTRAINT fk_kategorie_zubereitungsort FOREIGN KEY (zubereitungsort_id)
        REFERENCES zubereitungsort (zubereitungsort_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS artikel (
    artikel_id INTEGER NOT NULL AUTO_INCREMENT,
    kategorie_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    preis DECIMAL(10,2) NOT NULL,
    aktiv BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT pk_artikel PRIMARY KEY (artikel_id),
    CONSTRAINT uq_artikel_name_kategorie UNIQUE (name, kategorie_id),
    CONSTRAINT ck_artikel_preis CHECK (preis >= 0),
    CONSTRAINT fk_artikel_kategorie FOREIGN KEY (kategorie_id)
        REFERENCES kategorie (kategorie_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS bestellung (
    bestellung_id INTEGER NOT NULL AUTO_INCREMENT,
    tisch_id INTEGER NOT NULL,
    erstellt_von INTEGER NOT NULL,
    bestellstatus_id INTEGER NOT NULL,
    erstellt_am TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    bezahlt_am TIMESTAMP NULL DEFAULT NULL,
    CONSTRAINT pk_bestellung PRIMARY KEY (bestellung_id),
    CONSTRAINT fk_bestellung_tisch FOREIGN KEY (tisch_id)
        REFERENCES tisch (tisch_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_bestellung_mitarbeiter FOREIGN KEY (erstellt_von)
        REFERENCES mitarbeiter (mitarbeiter_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_bestellung_bestellstatus FOREIGN KEY (bestellstatus_id)
        REFERENCES bestellstatus (bestellstatus_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS statusprotokoll (
    statusprotokoll_id INTEGER NOT NULL AUTO_INCREMENT,
    bestellung_id INTEGER NOT NULL,
    mitarbeiter_id INTEGER NOT NULL,
    bestellstatus_id INTEGER NOT NULL,
    geaendert_am TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_statusprotokoll PRIMARY KEY (statusprotokoll_id),
    CONSTRAINT fk_statusprotokoll_bestellung FOREIGN KEY (bestellung_id)
        REFERENCES bestellung (bestellung_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_statusprotokoll_mitarbeiter FOREIGN KEY (mitarbeiter_id)
        REFERENCES mitarbeiter (mitarbeiter_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_statusprotokoll_bestellstatus FOREIGN KEY (bestellstatus_id)
        REFERENCES bestellstatus (bestellstatus_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS bestellposition (
    bestellposition_id INTEGER NOT NULL AUTO_INCREMENT,
    bestellung_id INTEGER NOT NULL,
    artikel_id INTEGER NOT NULL,
    menge INTEGER NOT NULL,
    einzelpreis DECIMAL(10,2) NOT NULL,
    CONSTRAINT pk_bestellposition PRIMARY KEY (bestellposition_id),
    CONSTRAINT uq_bestellposition_bestellung_artikel UNIQUE (bestellung_id, artikel_id),
    CONSTRAINT ck_bestellposition_menge CHECK (menge > 0),
    CONSTRAINT ck_bestellposition_einzelpreis CHECK (einzelpreis >= 0),
    CONSTRAINT fk_bestellposition_bestellung FOREIGN KEY (bestellung_id)
        REFERENCES bestellung (bestellung_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_bestellposition_artikel FOREIGN KEY (artikel_id)
        REFERENCES artikel (artikel_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;

-- Stammdaten aus den vorhandenen Aktivitäts- und Sequenzdiagrammen.
INSERT INTO rolle (rolle_id, bezeichnung) VALUES
    (1, 'Service'),
    (2, 'Küche')
ON DUPLICATE KEY UPDATE bezeichnung = VALUES(bezeichnung);

INSERT INTO tischstatus (tischstatus_id, bezeichnung) VALUES
    (1, 'frei'),
    (2, 'belegt')
ON DUPLICATE KEY UPDATE bezeichnung = VALUES(bezeichnung);

INSERT INTO bestellstatus (bestellstatus_id, bezeichnung) VALUES
    (1, 'aufgegeben'),
    (2, 'in Bearbeitung'),
    (3, 'fertig'),
    (4, 'serviert'),
    (5, 'bezahlt')
ON DUPLICATE KEY UPDATE bezeichnung = VALUES(bezeichnung);

INSERT INTO zubereitungsort (zubereitungsort_id, bezeichnung) VALUES
    (1, 'Küche'),
    (2, 'Bar')
ON DUPLICATE KEY UPDATE bezeichnung = VALUES(bezeichnung);
