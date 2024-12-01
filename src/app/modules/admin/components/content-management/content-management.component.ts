import { AfterViewInit, Component } from '@angular/core';
import { CommonConstant } from 'src/app/core/constants/CommonConstant';
import { CommonService } from 'src/app/core/services/common/common.service';

declare var $: any; // Declare jQuery to avoid TypeScript errors

@Component({
  selector: 'app-content-management',
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.css'],
})
export class ContentManagementComponent implements AfterViewInit {
  content: string = ''; // Holds the content from the Summernote editor

  constructor(private common: CommonService) {
    this.common.loadCSS(CommonConstant.CssForDashboard.cssFiles);
    this.common.loadJS(CommonConstant.JsForDashboard.jsFiles);
  }

  ngAfterViewInit(): void {
    // Disable a specific CSS file by targeting its href attribute
    const cssFile = document.querySelector(
      'link[href="/assets/css/style.min0b37.css?ver=2023.03"]'
    ) as HTMLLinkElement;

    if (cssFile) {
      cssFile.disabled = true;
    }

    // Remove an outdated or redundant script
    const scriptFile = document.querySelector(
      'script[src="/assets/js/jquery-2.1.4.min.js"]'
    ) as HTMLScriptElement;

    if (scriptFile) {
      scriptFile.remove();
    }

    // Load external scripts and initialize Summernote
    this.loadExternalScripts()
      .then(() => {
        // Initialize Summernote with custom toolbar and callbacks
        $('#summernote')
          .summernote({
            height: 300,
            callbacks: {
              onImageUpload: (files: File[]) => this.uploadImage(files),
            },
          })
          .on('summernote.error', (event: any, error: any) => {
            console.error('Summernote Error:', error);
          });
      })
      .catch((error) => {
        console.error('Error loading external scripts:', error);
      });
  }

  // Function to load external scripts and styles
  loadExternalScripts(): Promise<void[]> {
    const scriptUrls = ['/assets/plugins/summernote/summernote-bs4.min.js'];
    const linkUrls = ['/assets/plugins/summernote/summernote-bs4.min.css'];

    const scriptPromises = scriptUrls.map((url) => {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error(`Failed to load script: ${url}`));
        document.body.appendChild(script);
      });
    });

    const linkPromises = linkUrls.map((url) => {
      return new Promise<void>((resolve, reject) => {
        const link = document.createElement('link');
        link.href = url;
        link.rel = 'stylesheet';
        link.onload = () => resolve();
        link.onerror = () =>
          reject(new Error(`Failed to load stylesheet: ${url}`));
        document.head.appendChild(link);
      });
    });

    return Promise.all([...scriptPromises, ...linkPromises]);
  }

  // Function to upload images in the editor
  uploadImage(files: File[]): void {
    console.log('Uploaded files:', files);
    // Implement file upload logic or image embedding in Summernote here
    // You can upload to a server or embed locally if needed
  }

  // Function to save the content from the editor
  saveContent(): void {
    const content = $('#summernote').summernote('code');
    console.log('Saving content:', content);
    // Call a service or API to save the content to the server
    // You can bind this with your backend API
  }

  // Function to clear the editor
  clearEditor(): void {
    $('#summernote').summernote('reset');
    this.content = ''; // Clear local content variable
  }

  // Function to load content into the editor (if needed)
  loadContent(existingContent: string): void {
    $('#summernote').summernote('code', existingContent);
  }
}
