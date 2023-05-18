import { Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { Territories } from 'src/app/models/Territories.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ListService } from 'src/app/services/list/list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public temp: any;
  public arrangedList: any;
  constructor(private listService: ListService,
    private authService: AuthService,
    private el: ElementRef,
    private renderer: Renderer2) {
    listService.getAllTerritories()
      .then((result: Territories) => {
        const rootUl = this.renderer.createElement('ul');
        rootUl.id = 'myUL';

        // Append the root ul element
        this.el.nativeElement.appendChild(rootUl);

        // Generate the HTML hierarchy
        this.generateHTML(result.data, null, rootUl);

        this.addEvent();
      })
      .catch((): void => {
        alert("Failed to retrieve list of territories");
      });
  }

  generateHTML(records: any, parentId: string | null, parentElement: HTMLElement): void {
    const ul = this.renderer.createElement('ul');
    ul.classList.add("nested");

    for (const record of records) {
      if (record.parent === parentId) {
        const li = this.renderer.createElement('li');
        const span = this.renderer.createElement('span');
        span.textContent = record.name;

        li.appendChild(span);

        const children = records.filter((r: any) => r.parent === record.id);
        if (children.length > 0) {
          span.classList.add('caret');
          this.generateHTML(records, record.id, li);
        }

        ul.appendChild(li);
      }
    }

    // parentElement.appendChild(ul);
    parentElement.appendChild(ul);
  }

  addEvent() {
    var firstUL = document.getElementById("myUL");
    firstUL?.parentElement?.querySelector(".nested")?.classList.add("active");

    var toggler = document.getElementsByClassName("caret");
    for (let i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener("click", function() {
        toggler[i].parentElement?.querySelector(".nested")?.classList.toggle("active");
        toggler[i].classList.toggle("caret-down");
      });
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
