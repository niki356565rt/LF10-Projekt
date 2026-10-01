package com.smartrestaurant;

import javax.swing.*;
import java.awt.*;
import java.util.Locale;

/**
 * Schritt-für-Schritt Wizard-Dialog für das Anlegen und Bearbeiten von Menüpunkten / Artikeln.
 */
public class ArtikelWizardDialog extends JDialog {
    private int currentStep = 1;
    private final CardLayout cardLayout = new CardLayout();
    private final JPanel cardsPanel = new JPanel(cardLayout);
    private final JLabel lblStepTitle = new JLabel();

    private final JTextField txtName = new JTextField();
    private final JComboBox<String> cbKategorie = new JComboBox<>(new String[]{"Vorspeisen", "Hauptspeisen", "Desserts", "Getränke"});
    private final JTextField txtPreis = new JTextField();
    private final JCheckBox chkAktiv = new JCheckBox("Artikel ist auf Speisekarte aktiv", true);

    private final JLabel lblSummaryName = new JLabel();
    private final JLabel lblSummaryKategorie = new JLabel();
    private final JLabel lblSummaryPreis = new JLabel();

    private final JButton btnBack = new JButton("Zurück");
    private final JButton btnNext = new JButton("Weiter");
    private final JButton btnFinish = new JButton("Fertigstellen");

    private Artikel resultArtikel = null;
    private final Artikel editTarget;

    public ArtikelWizardDialog(Frame owner, Artikel editTarget) {
        super(owner, editTarget == null ? "Wizard: Neuen Menüpunkt anlegen" : "Wizard: Menüpunkt bearbeiten", true);
        this.editTarget = editTarget;
        initUI();
    }

    private void initUI() {
        setSize(480, 360);
        setLocationRelativeTo(getOwner());
        setLayout(new BorderLayout(10, 10));

        // Header Step-Indicator
        JPanel headerPanel = new JPanel(new BorderLayout());
        headerPanel.setBackground(new Color(24, 27, 31));
        headerPanel.setBorder(BorderFactory.createEmptyBorder(12, 16, 12, 16));
        lblStepTitle.setFont(new Font("SansSerif", Font.BOLD, 14));
        lblStepTitle.setForeground(Color.WHITE);
        headerPanel.add(lblStepTitle, BorderLayout.CENTER);
        add(headerPanel, BorderLayout.NORTH);

        // Step 1: Artikelbezeichnung & Kategorie
        JPanel p1 = new JPanel(new GridLayout(4, 2, 8, 8));
        p1.setBorder(BorderFactory.createEmptyBorder(15, 20, 15, 20));
        p1.add(new JLabel("Artikelbezeichnung:"));
        p1.add(txtName);
        p1.add(new JLabel("Kategorie:"));
        p1.add(cbKategorie);

        // Step 2: Preis & Aktivität
        JPanel p2 = new JPanel(new GridLayout(4, 2, 8, 8));
        p2.setBorder(BorderFactory.createEmptyBorder(15, 20, 15, 20));
        p2.add(new JLabel("Verkaufspreis (€):"));
        p2.add(txtPreis);
        p2.add(new JLabel("Status:"));
        p2.add(chkAktiv);

        // Step 3: Bestätigung
        JPanel p3 = new JPanel(new GridLayout(4, 2, 8, 8));
        p3.setBorder(BorderFactory.createEmptyBorder(15, 20, 15, 20));
        p3.add(new JLabel("Name:"));
        p3.add(lblSummaryName);
        p3.add(new JLabel("Kategorie:"));
        p3.add(lblSummaryKategorie);
        p3.add(new JLabel("Preis & Status:"));
        p3.add(lblSummaryPreis);

        cardsPanel.add(p1, "Step1");
        cardsPanel.add(p2, "Step2");
        cardsPanel.add(p3, "Step3");
        add(cardsPanel, BorderLayout.CENTER);

        // Pre-fill if editing
        if (editTarget != null) {
            txtName.setText(editTarget.getName());
            cbKategorie.setSelectedItem(editTarget.getKategorie());
            txtPreis.setText(String.format(Locale.US, "%.2f", editTarget.getPreis()));
            chkAktiv.setSelected(editTarget.isAktiv());
        }

        // Bottom Navigation Buttons
        JPanel navPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT, 10, 10));
        JButton btnCancel = new JButton("Abbrechen");

        btnCancel.addActionListener(e -> dispose());
        btnBack.addActionListener(e -> navigate(-1));
        btnNext.addActionListener(e -> navigate(1));
        btnFinish.addActionListener(e -> finish());

        navPanel.add(btnCancel);
        navPanel.add(btnBack);
        navPanel.add(btnNext);
        navPanel.add(btnFinish);
        add(navPanel, BorderLayout.SOUTH);

        updateStepView();
    }

    private void navigate(int delta) {
        if (delta > 0 && currentStep == 1) {
            if (txtName.getText().trim().isEmpty()) {
                JOptionPane.showMessageDialog(this, "Bitte einen Artikelnamen eingeben!", "Eingabefehler", JOptionPane.WARNING_MESSAGE);
                return;
            }
        }
        if (delta > 0 && currentStep == 2) {
            try {
                double p = Double.parseDouble(txtPreis.getText().trim().replace(',', '.'));
                if (p < 0) throw new NumberFormatException();
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, "Bitte einen gültigen Preis eingeben!", "Eingabefehler", JOptionPane.WARNING_MESSAGE);
                return;
            }
        }
        currentStep += delta;
        updateStepView();
    }

    private void updateStepView() {
        lblStepTitle.setText("Schritt " + currentStep + " von 3: " + getStepName(currentStep));
        cardLayout.show(cardsPanel, "Step" + currentStep);

        btnBack.setEnabled(currentStep > 1);
        btnNext.setVisible(currentStep < 3);
        btnFinish.setVisible(currentStep == 3);

        if (currentStep == 3) {
            lblSummaryName.setText(txtName.getText().trim());
            lblSummaryKategorie.setText((String) cbKategorie.getSelectedItem());
            double p = Double.parseDouble(txtPreis.getText().trim().replace(',', '.'));
            lblSummaryPreis.setText(String.format(Locale.GERMANY, "%.2f €", p) + (chkAktiv.isSelected() ? " (Aktiv)" : " (Inaktiv)"));
        }
    }

    private String getStepName(int step) {
        switch (step) {
            case 1: return "Artikelbezeichnung & Kategorie";
            case 2: return "Verkaufspreis festlegen";
            case 3: return "Eingaben überprüfen & Speichern";
            default: return "";
        }
    }

    private void finish() {
        int id = editTarget != null ? editTarget.getId() : 0;
        double p = Double.parseDouble(txtPreis.getText().trim().replace(',', '.'));
        resultArtikel = new Artikel(id, txtName.getText().trim(), (String) cbKategorie.getSelectedItem(), p, chkAktiv.isSelected());
        dispose();
    }

    public Artikel getResult() {
        return resultArtikel;
    }
}
