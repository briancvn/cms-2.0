import { AfterViewInit, Component, ContentChildren, OnInit, QueryList, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';

import { UserService } from '../Modules/System/User/Services/UserService';
import { CommonService } from '../Services/CommonService';
import { BaseComponent } from './BaseComponent';

@Component({
    selector: 'module-search',
    templateUrl: './ModuleSearchComponent.html'
})
export class ModuleSearchComponent extends BaseComponent implements OnInit, AfterViewInit {
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ContentChildren(TemplateRef) columnTemplateRefs: QueryList<TemplateRef<any>>;

    resultsLength = 0;
    isLoadingResults = false;
    isRateLimitReached = false;

    //columns: string[] = [];
    dataSource = new MatTableDataSource();

    constructor(commonService: CommonService, private service: UserService) {
        super(commonService);
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.columnTemplateRefs.forEach(x => {
            console.log('test');
        });

        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).pipe(
            startWith({}),
            switchMap(() => {
            this.isLoadingResults = true;
            return this.service.getRepoIssues(
                this.sort.active, this.sort.direction, this.paginator.pageIndex);
            }),
            map(data => {
            // Flip flag to show that loading has finished.
            this.isLoadingResults = false;
            this.isRateLimitReached = false;
            this.resultsLength = data.total_count;

            return data.items;
            }),
            catchError(() => {
            this.isLoadingResults = false;
            // Catch if the GitHub API has reached its rate limit. Return empty data.
            this.isRateLimitReached = true;
                return observableOf([]);
            })
        ).subscribe(data => this.dataSource.data = data);
    }
}
