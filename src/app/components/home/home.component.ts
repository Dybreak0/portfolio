import { Component } from '@angular/core';
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
    private authService: AuthService) {
    listService.getAllTerritories();

    listService.getAllTerritories()
      .then((result: Territories) => {
        const rootUl = document.createElement('ul');
        rootUl.id = 'myUL';

        // Append the root ul element to the document body
        document.body.appendChild(rootUl);

        // Generate the HTML hierarchy
        this.generateHTML(result.data, null, rootUl);
      })
      .catch((): void => {
        alert("Failed to retrieve list of territories");
      });
  }

  generateHTML(records: any, parentId: string | null, parentElement: HTMLElement): void {
    const ul = document.createElement('ul');
    ul.classList.add("nested");

    for (const record of records) {
      if (record.parent === parentId) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = record.name;
        span.classList.add('caret');
        span.addEventListener("click", this.toggle);

        li.appendChild(span);

        const children = records.filter((r: any) => r.parent === record.id);
        if (children.length > 0) {
          this.generateHTML(records, record.id, li);
        }

        ul.appendChild(li);
      }
    }

    parentElement.appendChild(ul);
  }

  toggle(event: any) {
    const targetElement: HTMLElement = event.target as HTMLElement;
    var nested = targetElement.parentElement?.querySelector(".nested");
    nested?.classList.toggle("active");
    targetElement.classList.toggle("caret-down");
  }

  logout(): void {
    this.authService.logout();
  }
}
