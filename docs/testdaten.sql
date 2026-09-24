-- Smart Restaurant – Vollständige Testdaten-Befüllung
-- Erweitert die Stammdaten um Mitarbeiter, Tische, Kategorien, Artikel, Bestellungen, Positionen und Protokolle

USE smart_restaurant;

-- 1. Rollen vervollständigen (Service, Küche, Administration)
INSERT INTO rolle (rolle_id, bezeichnung) VALUES
    (1, 'Service'),
    (2, 'Küche'),
    (3, 'Administration')
ON DUPLICATE KEY UPDATE bezeichnung = VALUES(bezeichnung);

-- 2. Tischstatus
INSERT INTO tischstatus (tischstatus_id, bezeichnung) VALUES
    (1, 'frei'),
    (2, 'belegt')
ON DUPLICATE KEY UPDATE bezeichnung = VALUES(bezeichnung);

-- 3. Bestellstatus
INSERT INTO bestellstatus (bestellstatus_id, bezeichnung) VALUES
    (1, 'aufgegeben'),
    (2, 'in Bearbeitung'),
    (3, 'fertig'),
    (4, 'serviert'),
    (5, 'bezahlt')
ON DUPLICATE KEY UPDATE bezeichnung = VALUES(bezeichnung);

-- 4. Zubereitungsort
INSERT INTO zubereitungsort (zubereitungsort_id, bezeichnung) VALUES
    (1, 'Küche'),
    (2, 'Bar')
ON DUPLICATE KEY UPDATE bezeichnung = VALUES(bezeichnung);

-- 5. Mitarbeiter (Service, Küche, Admin)
INSERT INTO mitarbeiter (mitarbeiter_id, rolle_id, name, benutzername, aktiv) VALUES
    (1, 1, 'Anna Service', 'aservice', TRUE),
    (2, 1, 'Ben Kellner', 'bkellner', TRUE),
    (3, 2, 'Karl Koch', 'kkoch', TRUE),
    (4, 2, 'Maria Chefkoch', 'mchef', TRUE),
    (5, 3, 'Chef Admin', 'admin', TRUE)
ON DUPLICATE KEY UPDATE name = VALUES(name), rolle_id = VALUES(rolle_id), aktiv = VALUES(aktiv);

-- 6. Tische (Tischnummer 1 bis 8 mit Kapazitäten 2 bis 8)
INSERT INTO tisch (tisch_id, tischstatus_id, tischnummer, kapazitaet) VALUES
    (1, 2, 1, 2), -- belegt
    (2, 2, 2, 4), -- belegt
    (3, 1, 3, 4), -- frei
    (4, 2, 4, 6), -- belegt
    (5, 1, 5, 8), -- frei
    (6, 1, 6, 2), -- frei
    (7, 1, 7, 4), -- frei
    (8, 1, 8, 6)  -- frei
ON DUPLICATE KEY UPDATE tischstatus_id = VALUES(tischstatus_id), kapazitaet = VALUES(kapazitaet);

-- 7. Kategorien (Küche: Vorspeisen, Hauptspeisen, Desserts; Bar: Getränke, Heißgetränke, Alkoholika)
INSERT INTO kategorie (kategorie_id, zubereitungsort_id, bezeichnung) VALUES
    (1, 1, 'Vorspeisen'),
    (2, 1, 'Hauptspeisen'),
    (3, 1, 'Desserts'),
    (4, 2, 'Alkoholfreie Getränke'),
    (5, 2, 'Heißgetränke'),
    (6, 2, 'Bier & Wein')
ON DUPLICATE KEY UPDATE zubereitungsort_id = VALUES(zubereitungsort_id), bezeichnung = VALUES(bezeichnung);

-- 8. Artikelstamm
INSERT INTO artikel (artikel_id, kategorie_id, name, preis, aktiv) VALUES
    -- Vorspeisen
    (1, 1, 'Tomatensuppe mit Basilikum', 6.50, TRUE),
    (2, 1, 'Bruschetta Originale', 7.90, TRUE),
    -- Hauptspeisen
    (3, 2, 'Wiener Schnitzel vom Kalb mit Pommes', 22.50, TRUE),
    (4, 2, 'Rumpsteak 250g mit Kräuterbutter', 26.90, TRUE),
    (5, 2, 'Penne Arrabiata (scharf)', 12.50, TRUE),
    (6, 2, 'Burger "Smart Classic" mit Fritten', 16.80, TRUE),
    -- Desserts
    (7, 3, 'Tiramisu Hausgemacht', 6.90, TRUE),
    (8, 3, 'Apfelstrudel mit Vanilleeis', 6.50, TRUE),
    -- Alkoholfreie Getränke
    (9, 4, 'Mineralwasser 0.5l', 3.50, TRUE),
    (10, 4, 'Coca-Cola 0.4l', 4.20, TRUE),
    (11, 4, 'Apfelschorle 0.4l', 3.90, TRUE),
    -- Heißgetränke
    (12, 5, 'Espresso', 2.80, TRUE),
    (13, 5, 'Cappuccino', 3.80, TRUE),
    -- Bier & Wein
    (14, 6, 'Pils vom Fass 0.5l', 4.80, TRUE),
    (15, 6, 'Grauburgunder 0.2l', 6.20, TRUE)
ON DUPLICATE KEY UPDATE preis = VALUES(preis), name = VALUES(name);

-- 9. Bestellungen in verschiedenen Zuständen
-- Bestellung 1: Tisch 1, beendet & bezahlt
INSERT INTO bestellung (bestellung_id, tisch_id, erstellt_von, bestellstatus_id, erstellt_am, bezahlt_am) VALUES
    (1, 1, 1, 5, NOW() - INTERVAL 120 MINUTE, NOW() - INTERVAL 30 MINUTE);

-- Bestellung 2: Tisch 2, serviert (wartet auf Rechnung)
INSERT INTO bestellung (bestellung_id, tisch_id, erstellt_von, bestellstatus_id, erstellt_am, bezahlt_am) VALUES
    (2, 2, 1, 4, NOW() - INTERVAL 60 MINUTE, NULL);

-- Bestellung 3: Tisch 4, in Bearbeitung (Küche kocht)
INSERT INTO bestellung (bestellung_id, tisch_id, erstellt_von, bestellstatus_id, erstellt_am, bezahlt_am) VALUES
    (3, 4, 2, 2, NOW() - INTERVAL 20 MINUTE, NULL);

-- Bestellung 4: Tisch 4, neu aufgegeben (eben erfasst)
INSERT INTO bestellung (bestellung_id, tisch_id, erstellt_von, bestellstatus_id, erstellt_am, bezahlt_am) VALUES
    (4, 4, 2, 1, NOW() - INTERVAL 5 MINUTE, NULL);

-- 10. Bestellpositionen für die Bestellungen
INSERT INTO bestellposition (bestellposition_id, bestellung_id, artikel_id, menge, einzelpreis) VALUES
    -- Positionen Bestellung 1
    (1, 1, 1, 1, 6.50),  -- Tomatensuppe
    (2, 1, 3, 1, 22.50), -- Wiener Schnitzel
    (3, 1, 10, 2, 4.20), -- 2x Cola
    (4, 1, 12, 1, 2.80), -- Espresso

    -- Positionen Bestellung 2
    (5, 2, 2, 2, 7.90),  -- 2x Bruschetta
    (6, 2, 4, 2, 26.90), -- 2x Rumpsteak
    (7, 2, 14, 3, 4.80), -- 3x Pils
    (8, 2, 7, 2, 6.90),  -- 2x Tiramisu

    -- Positionen Bestellung 3
    (9, 3, 6, 2, 16.80), -- 2x Burger Classic
    (10, 3, 5, 1, 12.50),-- Penne Arrabiata
    (11, 3, 11, 3, 3.90),-- 3x Apfelschorle

    -- Positionen Bestellung 4
    (12, 4, 8, 2, 6.50), -- 2x Apfelstrudel
    (13, 4, 13, 2, 3.80) -- 2x Cappuccino
ON DUPLICATE KEY UPDATE menge = VALUES(menge), einzelpreis = VALUES(einzelpreis);

-- 11. Statusprotokoll (Audit-Trail gemäß A-13)
INSERT INTO statusprotokoll (statusprotokoll_id, bestellung_id, mitarbeiter_id, bestellstatus_id, geaendert_am) VALUES
    -- Verlauf Bestellung 1 (aufgegeben -> in Bearbeitung -> fertig -> serviert -> bezahlt)
    (1, 1, 1, 1, NOW() - INTERVAL 120 MINUTE),
    (2, 1, 3, 2, NOW() - INTERVAL 110 MINUTE),
    (3, 1, 3, 3, NOW() - INTERVAL 90 MINUTE),
    (4, 1, 1, 4, NOW() - INTERVAL 80 MINUTE),
    (5, 1, 1, 5, NOW() - INTERVAL 30 MINUTE),

    -- Verlauf Bestellung 2 (aufgegeben -> in Bearbeitung -> fertig -> serviert)
    (6, 2, 1, 1, NOW() - INTERVAL 60 MINUTE),
    (7, 2, 4, 2, NOW() - INTERVAL 50 MINUTE),
    (8, 2, 4, 3, NOW() - INTERVAL 35 MINUTE),
    (9, 2, 1, 4, NOW() - INTERVAL 25 MINUTE),

    -- Verlauf Bestellung 3 (aufgegeben -> in Bearbeitung)
    (10, 3, 2, 1, NOW() - INTERVAL 20 MINUTE),
    (11, 3, 3, 2, NOW() - INTERVAL 15 MINUTE),

    -- Verlauf Bestellung 4 (aufgegeben)
    (12, 4, 2, 1, NOW() - INTERVAL 5 MINUTE)
ON DUPLICATE KEY UPDATE bestellstatus_id = VALUES(bestellstatus_id);
