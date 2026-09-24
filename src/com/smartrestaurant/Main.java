package com.smartrestaurant;

import javax.swing.*;

/**
 * Hauptklasse zum Starten der Smart Restaurant Adminsoftware.
 */
public class Main {
    public static void main(String[] args) {
        // Look & Feel auf System-Standard setzen
        try {
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        } catch (Exception ignored) {}

        // Datenbank initialisieren
        DatabaseManager.initDatabase();

        // GUI im Event Dispatch Thread starten
        SwingUtilities.invokeLater(() -> {
            AdminGUI gui = new AdminGUI();
            gui.setVisible(true);
        });
    }
}
