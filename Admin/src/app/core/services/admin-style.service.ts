import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { style } from '@angular/animations';
import { NgStyle } from '@angular/common';
import { CssSelector } from '@angular/compiler';
import { CssDimValue } from '@fullcalendar/core';
import { CommonApiService } from './common/common-api.service';
import { CommonVerbsApiService } from './common/common-verbs-api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AdminStyleService {
  private renderer: Renderer2;
  constructor(private rendererFactory: RendererFactory2,
    private http: HttpClient,
    
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
 
  }

  listarClases() {
    const elementos = document.getElementsByTagName('*');
    const clasesUnicas = new Set<string>();

    for (let i = 0; i < elementos.length; i++) {
      const clases = elementos[i].classList;
      for (let j = 0; j < clases.length; j++) {
        clasesUnicas.add(clases[j]);
      }
    }
  }

  cambiarColorPrimario(color: string) {
  const cssVariables = {
    '--primary-color': color,
  };

  Object.keys(cssVariables).forEach(property => {
    this.renderer.setStyle(document.body, property, cssVariables[property]);
  });
}




  setVariable(name: string, value: string) {
    document.documentElement.style.setProperty(`--${name}`, value);
    const variables = this.getVariablesFromLocalStorage();
    variables[name] = value;
    this.saveVariablesToLocalStorage(variables);
  }
  
  getVariable(name: string): string {
    const root = document.documentElement;
    const computedStyles = getComputedStyle(root);
    return computedStyles.getPropertyValue('--' + name).trim() || ''; // Obtener el valor de la variable del DOM
  }
  

  loadVariablesFromLocalStorage(variables: any[]) {
    variables.forEach(obj => {
      this.setVariable(obj.key, obj.value);
    });
  }
  
  resetVariablesInLocalStorage() {
    const variables = this.getVariablesFromLocalStorage();
    Object.keys(variables).forEach(key => {
      document.documentElement.style.removeProperty(`--${key}`);
    });
    localStorage.removeItem('customCSSVariables');
}


   getVariablesFromLocalStorage(): { [key: string]: string } {

    const storedVariables = localStorage.getItem('customCSSVariables');
    return storedVariables ? JSON.parse(storedVariables) : {};

  }

  private saveVariablesToLocalStorage(variables: { [key: string]: string }) {
    localStorage.setItem('customCSSVariables', JSON.stringify(variables));
  }


}
