package com.smartrestaurant;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.util.List;

/**
 * Grafische Benutzeroberfläche (Swing GUI) für die Administration des Smart Restaurants.
 */
public class AdminGUI extends JFrame {

    private JTabbedPane tabbedPane;

    // Tab 1: Mitarbeiter
    private JTable tableMitarbeiter;
    private DefaultTableModel modelMitarbeiter;
    private JTextField txtMitarbeiterName, txtMitarbeiterUser;
    private JComboBox<String> cbMitarbeiterRolle;

    // Tab 2: Artikel
    private JTable tableArtikel;
    private DefaultTableModel modelArtikel;
    private JTextField txtArtikelName, txtArtikelPreis;
    private JComboBox<String> cbArtikelKategorie;

    // Tab 3: Tische
    private JTable tableTische;
    private DefaultTableModel modelTische;
    private JTextField txtTischNummer, txtTischKapazitaet;
    private JComboBox<String> cbTischStatus;

    // Tab 4: Bestellungen
    private JTable tableBestellungen;
    private DefaultTableModel modelBestellungen;

    public AdminGUI() {
        setTitle("Smart Restaurant – Admin- & Verwaltungssoftware");
        setSize(950, 680);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        tabbedPane = new JTabbedPane();
        tabbedPane.setFont(new Font("Segoe UI", Font.PLAIN, 13));

        tabbedPane.addTab("Mitarbeiterverwaltung", createMitarbeiterPanel());
        tabbedPane.addTab("Artikelverwaltung", createArtikelPanel());
        tabbedPane.addTab("Tischverwaltung", createTischPanel());
        tabbedPane.addTab("Bestellübersicht", createBestellPanel());
        tabbedPane.addTab("System & DB Status", createSystemPanel());

        add(tabbedPane, BorderLayout.CENTER);

        // Daten beim Start laden
        refreshAllTables();
    }

    /**
     * Konfiguriert Zeilenhöhe, Schriftart und Gitterlinien für maximale Lesbarkeit.
     */
    private void configureTable(JTable table) {
        table.setRowHeight(30);
        table.setFont(new Font("Segoe UI", Font.PLAIN, 14));
        table.getTableHeader().setFont(new Font("Segoe UI", Font.BOLD, 14));
        table.getTableHeader().setPreferredSize(new Dimension(0, 32));
        table.setShowGrid(true);
        table.setGridColor(new Color(220, 220, 220));
        table.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
    }

    // --- TAB 1: MITARBEITER ---
    private JPanel createMitarbeiterPanel() {
        JPanel panel = new JPanel(new BorderLayout(10, 10));
        panel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

        modelMitarbeiter = new DefaultTableModel(new String[]{"ID", "Name", "Benutzername", "Rolle", "Aktiv"}, 0) {
            @Override
            public boolean isCellEditable(int row, int column) { return false; }
        };
        tableMitarbeiter = new JTable(modelMitarbeiter);
        configureTable(tableMitarbeiter);
        panel.add(new JScrollPane(tableMitarbeiter), BorderLayout.CENTER);

        JPanel formPanel = new JPanel(new GridLayout(2, 6, 8, 8));
        formPanel.setBorder(BorderFactory.createTitledBorder("Mitarbeiter verwalten (Anlegen / Bearbeiten)"));

        txtMitarbeiterName = new JTextField();
        txtMitarbeiterUser = new JTextField();
        cbMitarbeiterRolle = new JComboBox<>(new String[]{"Service", "Küche", "Administration"});
        JButton btnAdd = new JButton("Hinzufügen");
        JButton btnEdit = new JButton("Bearbeiten");
        JButton btnDelete = new JButton("Löschen");

        formPanel.add(new JLabel("Name:"));
        formPanel.add(new JLabel("Benutzername:"));
        formPanel.add(new JLabel("Rolle:"));
        formPanel.add(new JLabel(""));
        formPanel.add(new JLabel(""));
        formPanel.add(new JLabel(""));

        formPanel.add(txtMitarbeiterName);
        formPanel.add(txtMitarbeiterUser);
        formPanel.add(cbMitarbeiterRolle);
        formPanel.add(btnAdd);
        formPanel.add(btnEdit);
        formPanel.add(btnDelete);

        panel.add(formPanel, BorderLayout.SOUTH);

        btnAdd.addActionListener(e -> {
            MitarbeiterWizardDialog wizard = new MitarbeiterWizardDialog(this, null);
            wizard.setVisible(true);
            Mitarbeiter newM = wizard.getResult();
            if (newM != null) {
                DatabaseManager.addMitarbeiter(newM);
                refreshMitarbeiterTable();
            }
        });

        btnEdit.addActionListener(e -> {
            int row = tableMitarbeiter.getSelectedRow();
            if (row >= 0) {
                int id = (int) modelMitarbeiter.getValueAt(row, 0);
                String name = (String) modelMitarbeiter.getValueAt(row, 1);
                String user = (String) modelMitarbeiter.getValueAt(row, 2);
                String rolle = (String) modelMitarbeiter.getValueAt(row, 3);
                boolean aktiv = (boolean) modelMitarbeiter.getValueAt(row, 4);

                Mitarbeiter current = new Mitarbeiter(id, name, user, rolle, aktiv);
                MitarbeiterWizardDialog wizard = new MitarbeiterWizardDialog(this, current);
                wizard.setVisible(true);
                Mitarbeiter updated = wizard.getResult();
                if (updated != null) {
                    DatabaseManager.updateMitarbeiter(updated);
                    refreshMitarbeiterTable();
                }
            } else {
                JOptionPane.showMessageDialog(this, "Bitte eine Zeile zum Bearbeiten auswählen!", "Hinweis", JOptionPane.WARNING_MESSAGE);
            }
        });

        btnDelete.addActionListener(e -> {
            int row = tableMitarbeiter.getSelectedRow();
            if (row >= 0) {
                int id = (int) modelMitarbeiter.getValueAt(row, 0);
                DatabaseManager.deleteMitarbeiter(id);
                refreshMitarbeiterTable();
            } else {
                JOptionPane.showMessageDialog(this, "Bitte eine Zeile auswählen!", "Hinweis", JOptionPane.WARNING_MESSAGE);
            }
        });

        return panel;
    }

    // --- TAB 2: ARTIKEL ---
    private JPanel createArtikelPanel() {
        JPanel panel = new JPanel(new BorderLayout(10, 10));
        panel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

        modelArtikel = new DefaultTableModel(new String[]{"ID", "Name", "Kategorie", "Preis (€)", "Aktiv"}, 0) {
            @Override
            public boolean isCellEditable(int row, int column) { return false; }
        };
        tableArtikel = new JTable(modelArtikel);
        configureTable(tableArtikel);
        panel.add(new JScrollPane(tableArtikel), BorderLayout.CENTER);

        JPanel formPanel = new JPanel(new GridLayout(2, 6, 8, 8));
        formPanel.setBorder(BorderFactory.createTitledBorder("Menüpunkt / Artikel verwalten (Wizard-Dialoge)"));

        txtArtikelName = new JTextField();
        txtArtikelPreis = new JTextField();
        cbArtikelKategorie = new JComboBox<>(new String[]{"Vorspeisen", "Hauptspeisen", "Desserts", "Getränke"});
        JButton btnAdd = new JButton("Wizard: Neu Anlegen");
        JButton btnEdit = new JButton("Wizard: Bearbeiten");
        JButton btnDelete = new JButton("Löschen");

        formPanel.add(new JLabel("Artikelname:"));
        formPanel.add(new JLabel("Kategorie:"));
        formPanel.add(new JLabel("Preis (€):"));
        formPanel.add(new JLabel(""));
        formPanel.add(new JLabel(""));
        formPanel.add(new JLabel(""));

        formPanel.add(txtArtikelName);
        formPanel.add(cbArtikelKategorie);
        formPanel.add(txtArtikelPreis);
        formPanel.add(btnAdd);
        formPanel.add(btnEdit);
        formPanel.add(btnDelete);

        panel.add(formPanel, BorderLayout.SOUTH);

        btnAdd.addActionListener(e -> {
            ArtikelWizardDialog wizard = new ArtikelWizardDialog(this, null);
            wizard.setVisible(true);
            Artikel newA = wizard.getResult();
            if (newA != null) {
                DatabaseManager.addArtikel(newA);
                refreshArtikelTable();
            }
        });

        btnEdit.addActionListener(e -> {
            int row = tableArtikel.getSelectedRow();
            if (row >= 0) {
                int id = (int) modelArtikel.getValueAt(row, 0);
                String name = (String) modelArtikel.getValueAt(row, 1);
                String kat = (String) modelArtikel.getValueAt(row, 2);
                double preis = (double) modelArtikel.getValueAt(row, 3);
                boolean aktiv = (boolean) modelArtikel.getValueAt(row, 4);

                Artikel current = new Artikel(id, name, kat, preis, aktiv);
                ArtikelWizardDialog wizard = new ArtikelWizardDialog(this, current);
                wizard.setVisible(true);
                Artikel updated = wizard.getResult();
                if (updated != null) {
                    DatabaseManager.updateArtikel(updated);
                    refreshArtikelTable();
                }
            } else {
                JOptionPane.showMessageDialog(this, "Bitte einen Artikel zum Bearbeiten auswählen!", "Hinweis", JOptionPane.WARNING_MESSAGE);
            }
        });

        btnDelete.addActionListener(e -> {
            int row = tableArtikel.getSelectedRow();
            if (row >= 0) {
                int id = (int) modelArtikel.getValueAt(row, 0);
                DatabaseManager.deleteArtikel(id);
                refreshArtikelTable();
            }
        });

        return panel;
    }

    // --- TAB 3: TISCHE ---
    private JPanel createTischPanel() {
        JPanel panel = new JPanel(new BorderLayout(10, 10));
        panel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

        modelTische = new DefaultTableModel(new String[]{"ID", "Tischnummer", "Kapazität", "Status"}, 0) {
            @Override
            public boolean isCellEditable(int row, int column) { return false; }
        };
        tableTische = new JTable(modelTische);
        configureTable(tableTische);
        panel.add(new JScrollPane(tableTische), BorderLayout.CENTER);

        JPanel formPanel = new JPanel(new GridLayout(2, 6, 8, 8));
        formPanel.setBorder(BorderFactory.createTitledBorder("Tisch verwalten (Wizard-Dialoge)"));

        txtTischNummer = new JTextField();
        txtTischKapazitaet = new JTextField();
        cbTischStatus = new JComboBox<>(new String[]{"frei", "belegt"});
        JButton btnAdd = new JButton("Wizard: Neu Anlegen");
        JButton btnEdit = new JButton("Wizard: Bearbeiten");
        JButton btnDelete = new JButton("Löschen");

        formPanel.add(new JLabel("Tischnummer:"));
        formPanel.add(new JLabel("Kapazität:"));
        formPanel.add(new JLabel("Status:"));
        formPanel.add(new JLabel(""));
        formPanel.add(new JLabel(""));
        formPanel.add(new JLabel(""));

        formPanel.add(txtTischNummer);
        formPanel.add(txtTischKapazitaet);
        formPanel.add(cbTischStatus);
        formPanel.add(btnAdd);
        formPanel.add(btnEdit);
        formPanel.add(btnDelete);

        panel.add(formPanel, BorderLayout.SOUTH);

        btnAdd.addActionListener(e -> {
            TischWizardDialog wizard = new TischWizardDialog(this, null);
            wizard.setVisible(true);
            Tisch newT = wizard.getResult();
            if (newT != null) {
                DatabaseManager.addTisch(newT);
                refreshTischeTable();
            }
        });

        btnEdit.addActionListener(e -> {
            int row = tableTische.getSelectedRow();
            if (row >= 0) {
                int id = (int) modelTische.getValueAt(row, 0);
                int nr = (int) modelTische.getValueAt(row, 1);
                int kap = (int) modelTische.getValueAt(row, 2);
                String status = (String) modelTische.getValueAt(row, 3);

                Tisch current = new Tisch(id, nr, kap, status);
                TischWizardDialog wizard = new TischWizardDialog(this, current);
                wizard.setVisible(true);
                Tisch updated = wizard.getResult();
                if (updated != null) {
                    DatabaseManager.updateTisch(updated);
                    refreshTischeTable();
                }
            } else {
                JOptionPane.showMessageDialog(this, "Bitte einen Tisch zum Bearbeiten auswählen!", "Hinweis", JOptionPane.WARNING_MESSAGE);
            }
        });

        btnDelete.addActionListener(e -> {
            int row = tableTische.getSelectedRow();
            if (row >= 0) {
                int id = (int) modelTische.getValueAt(row, 0);
                DatabaseManager.deleteTisch(id);
                refreshTischeTable();
            }
        });

        return panel;
    }

    // --- TAB 4: BESTELLUNGEN ---
    private JPanel createBestellPanel() {
        JPanel panel = new JPanel(new BorderLayout(10, 10));
        panel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

        modelBestellungen = new DefaultTableModel(new String[]{"Bestell-ID", "Tisch #", "Erstellt von", "Status", "Erstellt am", "Gesamt (€)"}, 0) {
            @Override
            public boolean isCellEditable(int row, int column) { return false; }
        };
        tableBestellungen = new JTable(modelBestellungen);
        configureTable(tableBestellungen);
        panel.add(new JScrollPane(tableBestellungen), BorderLayout.CENTER);

        JPanel btnPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
        JButton btnStatusNext = new JButton("Status weiterschalten");
        JButton btnDeleteOrder = new JButton("Bestellung löschen");
        JButton btnRefresh = new JButton("Aktualisieren");

        btnPanel.add(btnStatusNext);
        btnPanel.add(btnDeleteOrder);
        btnPanel.add(btnRefresh);

        panel.add(btnPanel, BorderLayout.SOUTH);

        btnStatusNext.addActionListener(e -> {
            int row = tableBestellungen.getSelectedRow();
            if (row >= 0) {
                int id = (int) modelBestellungen.getValueAt(row, 0);
                String currentStatus = (String) modelBestellungen.getValueAt(row, 3);
                String nextStatus = getNextStatus(currentStatus);
                DatabaseManager.updateBestellstatus(id, nextStatus);
                refreshBestellungenTable();
            } else {
                JOptionPane.showMessageDialog(this, "Bitte eine Bestellung auswählen!", "Hinweis", JOptionPane.WARNING_MESSAGE);
            }
        });

        btnDeleteOrder.addActionListener(e -> {
            int row = tableBestellungen.getSelectedRow();
            if (row >= 0) {
                int id = (int) modelBestellungen.getValueAt(row, 0);
                int confirm = JOptionPane.showConfirmDialog(this, "Soll die Bestellung #" + id + " wirklich gelöscht werden?", "Bestellung löschen", JOptionPane.YES_NO_OPTION);
                if (confirm == JOptionPane.YES_OPTION) {
                    DatabaseManager.deleteBestellung(id);
                    refreshBestellungenTable();
                }
            } else {
                JOptionPane.showMessageDialog(this, "Bitte eine Bestellung zum Löschen auswählen!", "Hinweis", JOptionPane.WARNING_MESSAGE);
            }
        });

        btnRefresh.addActionListener(e -> refreshBestellungenTable());

        return panel;
    }

    private String getNextStatus(String status) {
        switch (status) {
            case "aufgegeben": return "in Bearbeitung";
            case "in Bearbeitung": return "fertig";
            case "fertig": return "serviert";
            case "serviert": return "bezahlt";
            default: return status;
        }
    }

    // --- TAB 5: SYSTEM INFO ---
    private JPanel createSystemPanel() {
        JPanel panel = new JPanel(new BorderLayout(10, 10));
        panel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        JTextArea infoText = new JTextArea();
        infoText.setEditable(false);
        infoText.setFont(new Font("Consolas", Font.PLAIN, 14));
        infoText.setText("=== Smart Restaurant – System & Datenbank Status ===\n\n" +
                "DBMS: SQLite 3 (über Standard JDBC Driver)\n" +
                "Datenbank-Datei: smart_restaurant.db\n" +
                "Architektur: Java Swing GUI + DAO + Standard SQL Queries\n" +
                "Java Version: " + System.getProperty("java.version") + "\n\n" +
                "Status: Verbindung aktiv & betriebsbereit.");

        panel.add(new JScrollPane(infoText), BorderLayout.CENTER);
        return panel;
    }

    // --- REFRESH METHODEN ---

    private void refreshAllTables() {
        refreshMitarbeiterTable();
        refreshArtikelTable();
        refreshTischeTable();
        refreshBestellungenTable();
    }

    private void refreshMitarbeiterTable() {
        modelMitarbeiter.setRowCount(0);
        List<Mitarbeiter> list = DatabaseManager.getAllMitarbeiter();
        for (Mitarbeiter m : list) {
            modelMitarbeiter.addRow(new Object[]{m.getId(), m.getName(), m.getBenutzername(), m.getRolle(), m.isAktiv() ? "Ja" : "Nein"});
        }
    }

    private void refreshArtikelTable() {
        modelArtikel.setRowCount(0);
        List<Artikel> list = DatabaseManager.getAllArtikel();
        for (Artikel a : list) {
            modelArtikel.addRow(new Object[]{a.getId(), a.getName(), a.getKategorie(), String.format("%.2f", a.getPreis()), a.isAktiv() ? "Ja" : "Nein"});
        }
    }

    private void refreshTischeTable() {
        modelTische.setRowCount(0);
        List<Tisch> list = DatabaseManager.getAllTische();
        for (Tisch t : list) {
            modelTische.addRow(new Object[]{t.getId(), t.getTischnummer(), t.getKapazitaet(), t.getStatus()});
        }
    }

    private void refreshBestellungenTable() {
        modelBestellungen.setRowCount(0);
        List<Bestellung> list = DatabaseManager.getAllBestellungen();
        for (Bestellung b : list) {
            modelBestellungen.addRow(new Object[]{b.getId(), b.getTischNummer(), b.getMitarbeiterName(), b.getStatus(), b.getErstelltAm(), String.format("%.2f", b.getGesamtpreis())});
        }
    }
}
