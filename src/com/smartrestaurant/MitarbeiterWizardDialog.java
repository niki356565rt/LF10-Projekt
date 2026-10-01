package com.smartrestaurant;

import javax.swing.*;
import java.awt.*;

/**
 * Schritt-für-Schritt Wizard-Dialog für das Anlegen und Bearbeiten von Mitarbeitern.
 */
public class MitarbeiterWizardDialog extends JDialog {
    private int currentStep = 1;
    private final CardLayout cardLayout = new CardLayout();
    private final JPanel cardsPanel = new JPanel(cardLayout);
    private final JLabel lblStepTitle = new JLabel();

    private final JTextField txtName = new JTextField();
    private final JTextField txtUser = new JTextField();
    private final JComboBox<String> cbRolle = new JComboBox<>(new String[]{"Service", "Küche", "Administration"});
    private final JCheckBox chkAktiv = new JCheckBox("Mitarbeiter ist aktiv", true);

    private final JLabel lblSummaryName = new JLabel();
    private final JLabel lblSummaryUser = new JLabel();
    private final JLabel lblSummaryRolle = new JLabel();

    private final JButton btnBack = new JButton("Zurück");
    private final JButton btnNext = new JButton("Weiter");
    private final JButton btnFinish = new JButton("Fertigstellen");

    private Mitarbeiter resultMitarbeiter = null;
    private final Mitarbeiter editTarget;

    public MitarbeiterWizardDialog(Frame owner, Mitarbeiter editTarget) {
        super(owner, editTarget == null ? "Wizard: Neuen Mitarbeiter anlegen" : "Wizard: Mitarbeiter bearbeiten", true);
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

        // Step 1: Stammdaten
        JPanel p1 = new JPanel(new GridLayout(4, 2, 8, 8));
        p1.setBorder(BorderFactory.createEmptyBorder(15, 20, 15, 20));
        p1.add(new JLabel("Vollständiger Name:"));
        p1.add(txtName);
        p1.add(new JLabel("System-Benutzername:"));
        p1.add(txtUser);

        // Step 2: Rolle & Status
        JPanel p2 = new JPanel(new GridLayout(4, 2, 8, 8));
        p2.setBorder(BorderFactory.createEmptyBorder(15, 20, 15, 20));
        p2.add(new JLabel("Funktionsrolle:"));
        p2.add(cbRolle);
        p2.add(new JLabel("Konto-Status:"));
        p2.add(chkAktiv);

        // Step 3: Bestätigung
        JPanel p3 = new JPanel(new GridLayout(4, 2, 8, 8));
        p3.setBorder(BorderFactory.createEmptyBorder(15, 20, 15, 20));
        p3.add(new JLabel("Name:"));
        p3.add(lblSummaryName);
        p3.add(new JLabel("Benutzername:"));
        p3.add(lblSummaryUser);
        p3.add(new JLabel("Rolle & Status:"));
        p3.add(lblSummaryRolle);

        cardsPanel.add(p1, "Step1");
        cardsPanel.add(p2, "Step2");
        cardsPanel.add(p3, "Step3");
        add(cardsPanel, BorderLayout.CENTER);

        // Pre-fill if editing
        if (editTarget != null) {
            txtName.setText(editTarget.getName());
            txtUser.setText(editTarget.getBenutzername());
            cbRolle.setSelectedItem(editTarget.getRolle());
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
            if (txtName.getText().trim().isEmpty() || txtUser.getText().trim().isEmpty()) {
                JOptionPane.showMessageDialog(this, "Bitte Name und Benutzername ausfüllen!", "Eingabefehler", JOptionPane.WARNING_MESSAGE);
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
            lblSummaryUser.setText(txtUser.getText().trim());
            lblSummaryRolle.setText(cbRolle.getSelectedItem() + (chkAktiv.isSelected() ? " (Aktiv)" : " (Inaktiv)"));
        }
    }

    private String getStepName(int step) {
        switch (step) {
            case 1: return "Personendaten eingeben";
            case 2: return "Rolle & Status festlegen";
            case 3: return "Eingaben überprüfen & Speichern";
            default: return "";
        }
    }

    private void finish() {
        int id = editTarget != null ? editTarget.getId() : 0;
        resultMitarbeiter = new Mitarbeiter(id, txtName.getText().trim(), txtUser.getText().trim(), (String) cbRolle.getSelectedItem(), chkAktiv.isSelected());
        dispose();
    }

    public Mitarbeiter getResult() {
        return resultMitarbeiter;
    }
}
