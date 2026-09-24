package com.smartrestaurant;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Führt alle Datenbank-Operationen mit Standard-SQL-Queries über JDBC aus.
 */
public class DatabaseManager {
    private static final String DB_URL = "jdbc:sqlite:smart_restaurant.db";

    static {
        try {
            Class.forName("org.sqlite.JDBC");
        } catch (ClassNotFoundException e) {
            System.err.println("SQLite JDBC Treiber nicht gefunden: " + e.getMessage());
        }
    }

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(DB_URL);
    }

    /**
     * Initialisiert die Tabellenstruktur und befüllt sie bei Bedarf mit Grunddaten.
     */
    public static void initDatabase() {
        try (Connection conn = getConnection(); Statement stmt = conn.createStatement()) {

            // 1. Tabelle Mitarbeiter
            stmt.executeUpdate("CREATE TABLE IF NOT EXISTS mitarbeiter (" +
                    "mitarbeiter_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "name TEXT NOT NULL, " +
                    "benutzername TEXT UNIQUE NOT NULL, " +
                    "rolle TEXT NOT NULL, " +
                    "aktiv INTEGER DEFAULT 1)");

            // 2. Tabelle Tisch
            stmt.executeUpdate("CREATE TABLE IF NOT EXISTS tisch (" +
                    "tisch_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "tischnummer INTEGER UNIQUE NOT NULL, " +
                    "kapazitaet INTEGER NOT NULL, " +
                    "status TEXT NOT NULL DEFAULT 'frei')");

            // 3. Tabelle Artikel
            stmt.executeUpdate("CREATE TABLE IF NOT EXISTS artikel (" +
                    "artikel_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "name TEXT NOT NULL, " +
                    "kategorie TEXT NOT NULL, " +
                    "preis REAL NOT NULL, " +
                    "aktiv INTEGER DEFAULT 1)");

            // 4. Tabelle Bestellung
            stmt.executeUpdate("CREATE TABLE IF NOT EXISTS bestellung (" +
                    "bestellung_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "tisch_id INTEGER NOT NULL, " +
                    "erstellt_von INTEGER NOT NULL, " +
                    "status TEXT NOT NULL DEFAULT 'aufgegeben', " +
                    "erstellt_am TIMESTAMP DEFAULT CURRENT_TIMESTAMP, " +
                    "gesamtpreis REAL DEFAULT 0.0, " +
                    "FOREIGN KEY(tisch_id) REFERENCES tisch(tisch_id), " +
                    "FOREIGN KEY(erstellt_von) REFERENCES mitarbeiter(mitarbeiter_id))");

            // 5. Testdaten einfügen falls Tabellen leer sind
            ResultSet rs = stmt.executeQuery("SELECT COUNT(*) FROM mitarbeiter");
            if (rs.next() && rs.getInt(1) == 0) {
                seedInitialData(conn);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static void seedInitialData(Connection conn) throws SQLException {
        try (Statement stmt = conn.createStatement()) {
            // Standard SQL INSERTs
            stmt.executeUpdate("INSERT INTO mitarbeiter (name, benutzername, rolle) VALUES " +
                    "('Anna Service', 'aservice', 'Service'), " +
                    "('Ben Kellner', 'bkellner', 'Service'), " +
                    "('Karl Koch', 'kkoch', 'Küche'), " +
                    "('Chef Admin', 'admin', 'Administration')");

            stmt.executeUpdate("INSERT INTO tisch (tischnummer, kapazitaet, status) VALUES " +
                    "(1, 2, 'belegt'), " +
                    "(2, 4, 'frei'), " +
                    "(3, 6, 'belegt'), " +
                    "(4, 8, 'frei')");

            stmt.executeUpdate("INSERT INTO artikel (name, kategorie, preis) VALUES " +
                    "('Tomatensuppe', 'Vorspeisen', 6.50), " +
                    "('Wiener Schnitzel', 'Hauptspeisen', 22.50), " +
                    "('Burger Classic', 'Hauptspeisen', 16.80), " +
                    "('Tiramisu', 'Desserts', 6.90), " +
                    "('Coca-Cola 0.4l', 'Getränke', 4.20), " +
                    "('Pils vom Fass 0.5l', 'Getränke', 4.80)");

            stmt.executeUpdate("INSERT INTO bestellung (tisch_id, erstellt_von, status, gesamtpreis) VALUES " +
                    "(1, 1, 'aufgegeben', 29.00), " +
                    "(3, 2, 'in Bearbeitung', 44.10)");
        }
    }

    // --- MITARBEITER CRUD (Standard SQL) ---

    public static List<Mitarbeiter> getAllMitarbeiter() {
        List<Mitarbeiter> list = new ArrayList<>();
        String sql = "SELECT mitarbeiter_id, name, benutzername, rolle, aktiv FROM mitarbeiter ORDER BY mitarbeiter_id";
        try (Connection conn = getConnection(); Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                list.add(new Mitarbeiter(
                        rs.getInt("mitarbeiter_id"),
                        rs.getString("name"),
                        rs.getString("benutzername"),
                        rs.getString("rolle"),
                        rs.getInt("aktiv") == 1
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    public static boolean addMitarbeiter(Mitarbeiter m) {
        String sql = "INSERT INTO mitarbeiter (name, benutzername, rolle, aktiv) VALUES (?, ?, ?, ?)";
        try (Connection conn = getConnection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, m.getName());
            pstmt.setString(2, m.getBenutzername());
            pstmt.setString(3, m.getRolle());
            pstmt.setInt(4, m.isAktiv() ? 1 : 0);
            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public static boolean deleteMitarbeiter(int id) {
        String sql = "DELETE FROM mitarbeiter WHERE mitarbeiter_id = ?";
        try (Connection conn = getConnection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // --- ARTIKEL CRUD (Standard SQL) ---

    public static List<Artikel> getAllArtikel() {
        List<Artikel> list = new ArrayList<>();
        String sql = "SELECT artikel_id, name, kategorie, preis, aktiv FROM artikel ORDER BY artikel_id";
        try (Connection conn = getConnection(); Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                list.add(new Artikel(
                        rs.getInt("artikel_id"),
                        rs.getString("name"),
                        rs.getString("kategorie"),
                        rs.getDouble("preis"),
                        rs.getInt("aktiv") == 1
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    public static boolean addArtikel(Artikel a) {
        String sql = "INSERT INTO artikel (name, kategorie, preis, aktiv) VALUES (?, ?, ?, ?)";
        try (Connection conn = getConnection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, a.getName());
            pstmt.setString(2, a.getKategorie());
            pstmt.setDouble(3, a.getPreis());
            pstmt.setInt(4, a.isAktiv() ? 1 : 0);
            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public static boolean deleteArtikel(int id) {
        String sql = "DELETE FROM artikel WHERE artikel_id = ?";
        try (Connection conn = getConnection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // --- TISCH CRUD (Standard SQL) ---

    public static List<Tisch> getAllTische() {
        List<Tisch> list = new ArrayList<>();
        String sql = "SELECT tisch_id, tischnummer, kapazitaet, status FROM tisch ORDER BY tischnummer";
        try (Connection conn = getConnection(); Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                list.add(new Tisch(
                        rs.getInt("tisch_id"),
                        rs.getInt("tischnummer"),
                        rs.getInt("kapazitaet"),
                        rs.getString("status")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    public static boolean addTisch(Tisch t) {
        String sql = "INSERT INTO tisch (tischnummer, kapazitaet, status) VALUES (?, ?, ?)";
        try (Connection conn = getConnection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, t.getTischnummer());
            pstmt.setInt(2, t.getKapazitaet());
            pstmt.setString(3, t.getStatus());
            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public static boolean deleteTisch(int id) {
        String sql = "DELETE FROM tisch WHERE tisch_id = ?";
        try (Connection conn = getConnection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // --- BESTELLUNG CRUD (Standard SQL mit JOINs) ---

    public static List<Bestellung> getAllBestellungen() {
        List<Bestellung> list = new ArrayList<>();
        String sql = "SELECT b.bestellung_id, b.tisch_id, t.tischnummer, b.erstellt_von, m.name AS mitarbeiter_name, " +
                "b.status, b.erstellt_am, b.gesamtpreis " +
                "FROM bestellung b " +
                "JOIN tisch t ON b.tisch_id = t.tisch_id " +
                "JOIN mitarbeiter m ON b.erstellt_von = m.mitarbeiter_id " +
                "ORDER BY b.bestellung_id DESC";
        try (Connection conn = getConnection(); Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                list.add(new Bestellung(
                        rs.getInt("bestellung_id"),
                        rs.getInt("tisch_id"),
                        rs.getInt("tischnummer"),
                        rs.getInt("erstellt_von"),
                        rs.getString("mitarbeiter_name"),
                        rs.getString("status"),
                        rs.getString("erstellt_am"),
                        rs.getDouble("gesamtpreis")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    public static boolean updateBestellstatus(int bestellungId, String newStatus) {
        String sql = "UPDATE bestellung SET status = ? WHERE bestellung_id = ?";
        try (Connection conn = getConnection(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, newStatus);
            pstmt.setInt(2, bestellungId);
            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}
