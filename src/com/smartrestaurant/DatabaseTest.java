package com.smartrestaurant;

import java.util.List;

/**
 * Automatisierter Test zur Überprüfung der Datenbank-Operationen und SQL-Abfragen.
 */
public class DatabaseTest {

    public static void main(String[] args) {
        System.out.println("=== AUTOMATISIERTER TEST: DatabaseManager & SQL ===");

        // 1. DB Init Test
        DatabaseManager.initDatabase();
        System.out.println("[PASS] 1. Datenbank erfolgreich initialisiert.");

        // 2. Mitarbeiter CRUD Test
        int initialMitarbeiterCount = DatabaseManager.getAllMitarbeiter().size();
        Mitarbeiter testMitarbeiter = new Mitarbeiter("Test Person", "testuser_" + System.currentTimeMillis(), "Service");
        boolean addSuccess = DatabaseManager.addMitarbeiter(testMitarbeiter);
        assertCondition(addSuccess, "Mitarbeiter konnte hinzugefügt werden.");

        List<Mitarbeiter> listM = DatabaseManager.getAllMitarbeiter();
        assertCondition(listM.size() == initialMitarbeiterCount + 1, "Mitarbeiter-Anzahl hat sich um 1 erhöht.");

        int createdId = listM.get(listM.size() - 1).getId();
        boolean delSuccess = DatabaseManager.deleteMitarbeiter(createdId);
        assertCondition(delSuccess, "Mitarbeiter konnte gelöscht werden.");
        System.out.println("[PASS] 2. Mitarbeiter CRUD-Operationen erfolgreich.");

        // 3. Artikel CRUD Test
        int initialArtikelCount = DatabaseManager.getAllArtikel().size();
        Artikel testArtikel = new Artikel("Test Pizza", "Hauptspeisen", 11.50);
        boolean addArtSuccess = DatabaseManager.addArtikel(testArtikel);
        assertCondition(addArtSuccess, "Artikel konnte hinzugefügt werden.");

        List<Artikel> listA = DatabaseManager.getAllArtikel();
        assertCondition(listA.size() == initialArtikelCount + 1, "Artikel-Anzahl hat sich um 1 erhöht.");

        int createdArtId = listA.get(listA.size() - 1).getId();
        boolean delArtSuccess = DatabaseManager.deleteArtikel(createdArtId);
        assertCondition(delArtSuccess, "Artikel konnte gelöscht werden.");
        System.out.println("[PASS] 3. Artikel CRUD-Operationen erfolgreich.");

        // 4. Tisch CRUD Test
        int initialTischCount = DatabaseManager.getAllTische().size();
        Tisch testTisch = new Tisch(99, 4, "frei");
        boolean addTischSuccess = DatabaseManager.addTisch(testTisch);
        assertCondition(addTischSuccess, "Tisch konnte hinzugefügt werden.");

        List<Tisch> listT = DatabaseManager.getAllTische();
        assertCondition(listT.size() == initialTischCount + 1, "Tisch-Anzahl hat sich um 1 erhöht.");

        int createdTischId = listT.get(listT.size() - 1).getId();
        boolean delTischSuccess = DatabaseManager.deleteTisch(createdTischId);
        assertCondition(delTischSuccess, "Tisch konnte gelöscht werden.");
        System.out.println("[PASS] 4. Tisch CRUD-Operationen erfolgreich.");

        // 5. Bestellstatus Update Test
        List<Bestellung> listB = DatabaseManager.getAllBestellungen();
        assertCondition(!listB.isEmpty(), "Bestellungen vorhanden.");
        Bestellung b1 = listB.get(0);
        boolean statusUpdateSuccess = DatabaseManager.updateBestellstatus(b1.getId(), "in Bearbeitung");
        assertCondition(statusUpdateSuccess, "Bestellstatus konnte auf 'in Bearbeitung' aktualisiert werden.");
        System.out.println("[PASS] 5. Bestellstatus-Update erfolgreich.");

        System.out.println("\n✅ ALLE AUTOMATISIERTEN TESTS ERFOLGREICH BESTANDEN!");
    }

    private static void assertCondition(boolean condition, String message) {
        if (!condition) {
            System.err.println("[FAIL] " + message);
            throw new RuntimeException("Test Fehlgeschlagen: " + message);
        } else {
            System.out.println("  ✓ " + message);
        }
    }
}
