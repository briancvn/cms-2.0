import { AfterViewInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { merge } from 'rxjs/observable/merge';
import { Observable } from 'rxjs/Rx';

import { CommonConstants } from '../Constants/CommonConstants';
import { IGridState } from '../Interfaces/IGridState';
import { ISearchResult } from '../Interfaces/ISearchResult';
import { CommonService } from '../Services/CommonService';
import { BaseComponent } from './BaseComponent';
import { GridColumnComponent } from './GridColumnComponent';

@Component({
    selector: 'grid',
    template: `
        <div fxLayout="column" fxFlexFill>
            <perfect-scrollbar fxFlex>
                <mat-table #table
                           *ngIf="columns"
                           matSort
                           matSortDisableClear
                           matSortDirection="asc"
                           [matSortActive]="columns.first.field"
                           [dataSource]="dataSource">
                    <ng-container *ngFor="let column of columns" [matColumnDef]="column.field">
                        <mat-header-cell *matHeaderCellDef mat-sort-header>
                            <span *ngIf="!column.headerTemplateRef">{{ 'Column.' + column.field | translate }}</span>
                            <ng-template *ngIf="column.headerTemplateRef" [ngTemplateOutlet]="column.headerTemplateRef"></ng-template>
                        </mat-header-cell>
                        <mat-cell *matCellDef="let row">
                            {{ row[column.field] }}
                        </mat-cell>
                    </ng-container>

                    <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
                    <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
                </mat-table>
            </perfect-scrollbar>
            <mat-paginator [length]="total" [pageSize]="CommonConstants.PAGE_SIZE"></mat-paginator>
        </div>`,
    styleUrls: ['../Styles/Components/Grid.scss']
})
export class GridComponent extends BaseComponent implements AfterViewInit {
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(PerfectScrollbarComponent) scrollbar: PerfectScrollbarComponent;

    @ContentChildren(GridColumnComponent) columns: QueryList<GridColumnComponent>;

    @Input() dataAsync: Observable<ISearchResult<any>>;
    @Output() change: EventEmitter<IGridState> = new EventEmitter<IGridState>();

    dataSource = new MatTableDataSource();
    total = 0;

    get displayedColumns(): string[] {
        return this.columns.map(column => column.field);
    }

    get gridState(): IGridState {
        return {
            PageIndex: this.paginator.pageIndex,
            Skip: CommonConstants.PAGE_SIZE * this.paginator.pageIndex,
            Take: CommonConstants.PAGE_SIZE,
            Sort: {
                Field: this.sort.active,
                Dir: this.sort.direction
            }
        };
    }

    constructor(commonService: CommonService) {
        super(commonService);
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this.subscribe(this.sort.sortChange, () => this.paginator.pageIndex = 0);
        this.subscribe(merge(this.sort.sortChange, this.paginator.page), () => this.change.next(this.gridState));
        this.subscribe(this.dataAsync, (results: ISearchResult<any>) => {
            this.total = results.total_count;
            this.dataSource.data = results.items;
        });
        this.change.next(this.gridState);
    }
}
