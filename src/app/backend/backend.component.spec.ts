import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendComponent } from './backend.component';
import { MatToolbarModule, MatFormFieldModule, MatCardModule, MatDividerModule, MatSidenavModule, MatInputModule, } from '@angular/material';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('BackendComponent', () => {
    let component: BackendComponent;
    let fixture: ComponentFixture<BackendComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatToolbarModule,
                FormsModule,
                MatInputModule,
                MatFormFieldModule,
                MatCardModule,
                MatDividerModule,
                MatSidenavModule,
                ChartsModule,
                HttpClientModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                ReactiveFormsModule
            ],
            declarations: [BackendComponent,
                            ToolbarComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BackendComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Search method', () => {
        expect(component.search.length).toBeGreaterThanOrEqual(0);
    });

    it('should create mat-sidenav', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('mat-drawer-container').textContent);
    });

});