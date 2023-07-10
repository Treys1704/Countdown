import { render } from "@testing-library/react"
import { screen } from '@testing-library/dom'
import React from "react"
import HelloWorld from "../HelloWorld";
test('affiche le message de bienvenue', () => {
    // Render le composant
    render(<HelloWorld />);
    
    // Trouver l'élément contenant le message
    const messageElement = screen.getByText(/Bienvenue/i);
    
    // Vérifier si le message est rendu correctement
    expect(messageElement).toBeInTheDocument();
  });