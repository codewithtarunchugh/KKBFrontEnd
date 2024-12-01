import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private renderer: Renderer2;
  private promises: Promise<void>[] = [];

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  loadCSS(files: string[]): Promise<void[]> {
    files.forEach((file) => {
      const linkElement = this.renderer.createElement('link');
      this.renderer.setAttribute(linkElement, 'href', file);
      this.renderer.setAttribute(linkElement, 'rel', 'stylesheet');
      this.renderer.appendChild(document.head, linkElement);

      const promise = new Promise<void>((resolve, reject) => {
        linkElement.onload = () => resolve();
        linkElement.onerror = () => reject(new Error(`Failed to load ${file}`));
      });

      this.promises.push(promise);
    });

    return Promise.all(this.promises);
  }

  loadJS(files: string[]): Promise<void[]> {
    files.forEach((file) => {
      const scriptElement = this.renderer.createElement('script');
      this.renderer.setAttribute(scriptElement, 'src', file);
      this.renderer.appendChild(document.body, scriptElement);

      const promise = new Promise<void>((resolve, reject) => {
        scriptElement.onload = () => resolve();
        scriptElement.onerror = () =>
          reject(new Error(`Failed to load ${file}`));
      });

      this.promises.push(promise);
    });

    return Promise.all(this.promises);
  }
}
