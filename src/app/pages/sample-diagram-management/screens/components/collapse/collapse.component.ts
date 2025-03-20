import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core'
import { collapseDiagramPageDefault, collapseDiagramPageSize, DataCollapseMapType, TITLE } from '../../../models'
import { ICategoryItem } from '@vks/app/shared/models'
import { FormControl } from '@angular/forms'
import { LoadingService } from '@vks/app/services'
import { debounceTime, distinctUntilChanged } from 'rxjs'

@Component({
    selector: 'vks-collapse',
    templateUrl: './collapse.component.html',
    styleUrl: './collapse.component.scss',
})
export class CollapseComponent implements OnInit, OnChanges {
    @Input() departmentList: ICategoryItem[] = []
    @Input() dataCollapse: DataCollapseMapType = {}

    @Output() getData = new EventEmitter()

    readonly pageSize = collapseDiagramPageSize
    readonly pageDefault = collapseDiagramPageDefault
    readonly TITLE = TITLE
    searchControl = new FormControl()
    currentDepartment: ICategoryItem = {
        id: 0,
        code: '',
        name: '',
    }
    constructor(private loadingService: LoadingService) {}
    ngOnInit(): void {
        this.searchControl.valueChanges
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe((textSearch: string) => {
                this.onSearch(textSearch, null)
                // console.log(textSearch)
            })
    }

    ngOnChanges(changes: SimpleChanges): void {
        //  console.log(changes)
        if (changes['departmentList'] && this.departmentList.length) {
            this.loadingService.showLoading(true)
            this.getData.emit({ searchData: { departmentId: this.departmentList[0].id, textSearch: '' }, page: 1 })
        }
    }

    onPageChange(e: any, h: any): void {
        console.log('e', e)
        console.log('h', h)
    }

    checkUrlImage(url: string): string {
        if (url.length) {
            return url
        } else {
            return 'assets/blank_diagram.png'
        }
    }
    onCollapsedChange(isExpand: boolean, department: ICategoryItem) {
        if (!isExpand && department.code) {
            this.loadingService.showLoading(true)
            this.getData.emit({ searchData: { departmentId: department.id, textSearch: '' }, page: 1 })
        }
    }

    onSearch(searchTerm: string, department: ICategoryItem | null): void {
        if (department) {
            this.currentDepartment = department
        } else if (this.currentDepartment.code) {
            this.loadingService.showLoading(true)
            this.getData.emit({
                searchData: { departmentId: this.currentDepartment.id, textSearch: searchTerm || '' },
                page: this.dataCollapse[this.currentDepartment.code].currentActivePage + 1,
            })
        }
    }

    onOpenDiagramEditor(currentDiagram: any, department: any) {}
}
