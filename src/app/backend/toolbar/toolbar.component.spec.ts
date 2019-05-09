import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { MatToolbarModule, MatFormFieldModule, MatCardModule, MatDividerModule, MatSidenavModule } from '@angular/material';
import { BackendComponent } from '../backend.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

describe('ToolbarComponent', () => {
    let component: ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatToolbarModule,
                FormsModule,
                MatFormFieldModule,
                MatCardModule,
                MatDividerModule,
                ChartsModule,
                MatSidenavModule,
            ],
            declarations: [ToolbarComponent,
                            BackendComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create toolbar', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('mat-toolbar').textContent).toContain('TrafficAnalysis.io');
    });
});