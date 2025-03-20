/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core'
import {
    AbstractControl,
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms'
import * as go from 'gojs'
import { DataSyncService, DiagramComponent, GojsAngularModule, PaletteComponent } from 'gojs-angular'
import produce from 'immer'
import { ButtonModule } from 'primeng/button'
import { ColorPickerChangeEvent, ColorPickerModule } from 'primeng/colorpicker'
import { DialogModule } from 'primeng/dialog'
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown'
import { InputTextModule } from 'primeng/inputtext'
import { PanelModule } from 'primeng/panel'
import { SelectButtonModule } from 'primeng/selectbutton'

import {
    Colors,
    IDiagramDetailData,
    IDiagramModelData,
    IDiagramNode,
    INodeSelected,
    IPaletteNodeData,
    nodeDiagram,
    regexNameDiagram,
    skipsDiagramUpdateType,
    TEXT_TITLE,
    textFont,
    textFontSize,
    textType,
} from '@vks/app/pages/sample-diagram-management/models'

interface PointData {
    S: number
    P: number
    f: boolean
}
interface IPointDataP {
    b: number
    k: number
    h: boolean
}

@Component({
    selector: 'vks-diagram-modal',
    templateUrl: './diagram-modal.html',
    styleUrl: './diagram-modal.scss',
    standalone: true,
    imports: [
        GojsAngularModule,
        DialogModule,
        ButtonModule,
        SelectButtonModule,
        DropdownModule,
        PanelModule,
        ColorPickerModule,
        InputTextModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class DiagramModalComponent implements AfterViewInit, OnInit {
    @Input() diagramData: IDiagramDetailData = {
        id: undefined,
        name: '',
        dataNode: '',
        dataLink: '',
    }
    @Input() isEditNameDiagram: boolean = false

    @Output() cancel = new EventEmitter()
    @Output() editName = new EventEmitter()
    @Output() saveDiagram = new EventEmitter()
    @Output() saveNameDiagram = new EventEmitter()

    @ViewChild('myDiagram', { static: true })
    myDiagramComponent!: DiagramComponent
    @ViewChild('myPalette', { static: true })
    myPaletteComponent!: PaletteComponent

    readonly TEXT_TITLE = TEXT_TITLE
    readonly textOptions = textType
    readonly fontOptions = textFont
    readonly textFontOptions = textFontSize

    public state: {
        diagramNodeData: IDiagramNode[]
        diagramLinkData: go.Link[]
        diagramModelData: IDiagramModelData
        skipsDiagramUpdate: skipsDiagramUpdateType
        selectedNodeData: IDiagramNode
        paletteNodeData: IPaletteNodeData[]
    } = {
        diagramNodeData: [],
        diagramLinkData: [],
        diagramModelData: { prop: 'value' },
        skipsDiagramUpdate: false,
        selectedNodeData: {
            id: null,
            text: '',
            fill: null,
            stroke: null,
            textStroke: null,
            size: null,
            font: '',
            category: undefined,
        },
        paletteNodeData: [
            {
                key: 1,
                font: 'bold 10pt Helvetica, Arial, sans-serif',
                text: '',
                figure: 'Ellipse',
                size: '50 50',
                fill: Colors.while,
                background: Colors.while,
                stroke: Colors.black,
                textStroke: Colors.black,
            },
            {
                key: 2,
                font: 'bold 10pt Helvetica, Arial, sans-serif',
                text: '',
                figure: 'Diamond',
                fill: Colors.while,
                size: '50 50',
                stroke: Colors.black,
                textStroke: Colors.black,
            },
            {
                key: 3,
                text: 'Comment',
                font: 'bold 10pt Helvetica, Arial, sans-serif',
                stroke: Colors.black,
                figure: 'RoundedRectangle',
                fill: Colors.while,
                textStroke: Colors.black,
            },
            {
                key: 'ImageIcon',
                category: 'Image',
                width: 200,
                height: 150,
                fill: null,
                size: '200 150',
                source: nodeDiagram.imageIcon,
                stroke: null,
            },
            {
                key: 'TextIcon',
                category: 'TextIcon',
                font: 'bold 10pt Helvetica, Arial, sans-serif',
                text: 'Comments',
                stroke: Colors.black,
                textStroke: Colors.black,
            },
            { key: 'StickMan', category: 'stickman' },
        ],
    }
    diagramDivClassName: string = 'myDiagramDiv'
    paletteDivClassName: string = 'myPaletteDiv'
    observedDiagram: any = null
    selectedNodeData: go.ObjectData | null = null
    keySelectedNodeArray: string[] | null = []
    importDiagramElement!: HTMLButtonElement
    isSaveButton: boolean = false
    nameDiagram = new FormControl<string>('', [Validators.required, this.nameValidator()])
    convertedNodeData: INodeSelected = {
        id: null,
        text: '',
        textStyle: [],
        textFont: {
            name: '',
            code: '',
        },
        textFontSize: {
            name: '',
            code: '',
        },
        textColor: Colors.black,
        backgroundColor: Colors.while,
    }
    constructor(private cdr: ChangeDetectorRef) {}

    // listen changes in diagram
    public diagramModelChange = (changes: go.IncrementalData) => {
        if (!changes) return
        this.state = produce(this.state, (draft: any) => {
            draft.skipsDiagramUpdate = true
            draft.diagramNodeData = DataSyncService.syncNodeData(
                changes,
                draft.diagramNodeData,
                this.observedDiagram.model,
            )
            draft.diagramLinkData = DataSyncService.syncLinkData(
                changes,
                draft.diagramLinkData,
                this.observedDiagram.model,
            )
            draft.diagramModelData = DataSyncService.syncModelData(changes, draft.diagramModelData)
            const modifiedNodeDatas = changes.modifiedNodeData
            if (modifiedNodeDatas && draft.selectedNodeData) {
                for (let i = 0; i < modifiedNodeDatas.length; i++) {
                    const mn = modifiedNodeDatas[i]
                    const nodeKeyProperty = this.myDiagramComponent.diagram.model.nodeKeyProperty as string
                    if (mn[nodeKeyProperty] === draft.selectedNodeData[nodeKeyProperty]) {
                        draft.selectedNodeData = mn
                    }
                }
            }
        })
    }
    public initDiagram(): go.Diagram {
        const $ = go.GraphObject.make
        // define display selection when select a node
        const nodeSelectionAdornmentTemplate = $(
            go.Adornment,
            'Auto',
            $(go.Shape, {
                fill: null,
                stroke: 'deepskyblue',
                strokeWidth: 1.5,
                strokeDashArray: [4, 2],
            }),
            $(go.Placeholder),
        )
        // define resize dot when select a node
        const nodeResizeAdornmentTemplate = $(
            go.Adornment,
            'Spot',
            { locationSpot: go.Spot.Right },
            $(go.Placeholder),
            $(go.Shape, {
                alignment: go.Spot.TopLeft,
                cursor: 'nw-resize',
                desiredSize: new go.Size(6, 6),
                fill: 'lightblue',
                stroke: 'deepskyblue',
            }),
            $(go.Shape, {
                alignment: go.Spot.Top,
                cursor: 'n-resize',
                desiredSize: new go.Size(6, 6),
                fill: 'lightblue',
                stroke: 'deepskyblue',
            }),
            $(go.Shape, {
                alignment: go.Spot.TopRight,
                cursor: 'ne-resize',
                desiredSize: new go.Size(6, 6),
                fill: 'lightblue',
                stroke: 'deepskyblue',
            }),

            $(go.Shape, {
                alignment: go.Spot.Left,
                cursor: 'w-resize',
                desiredSize: new go.Size(6, 6),
                fill: 'lightblue',
                stroke: 'deepskyblue',
            }),
            $(go.Shape, {
                alignment: go.Spot.Right,
                cursor: 'e-resize',
                desiredSize: new go.Size(6, 6),
                fill: 'lightblue',
                stroke: 'deepskyblue',
            }),

            $(go.Shape, {
                alignment: go.Spot.BottomLeft,
                cursor: 'se-resize',
                desiredSize: new go.Size(6, 6),
                fill: 'lightblue',
                stroke: 'deepskyblue',
            }),
            $(go.Shape, {
                alignment: go.Spot.Bottom,
                cursor: 's-resize',
                desiredSize: new go.Size(6, 6),
                fill: 'lightblue',
                stroke: 'deepskyblue',
            }),
            $(go.Shape, {
                alignment: go.Spot.BottomRight,
                cursor: 'sw-resize',
                desiredSize: new go.Size(6, 6),
                fill: 'lightblue',
                stroke: 'deepskyblue',
            }),
        )
        // define rotate dot when select a node
        const nodeRotateAdornmentTemplate = $(
            go.Adornment,
            { locationSpot: go.Spot.Center, locationObjectName: 'ELLIPSE' },
            $(go.Shape, 'Ellipse', {
                name: 'ELLIPSE',
                cursor: 'pointer',
                desiredSize: new go.Size(7, 7),
                fill: 'lightblue',
                stroke: 'deepskyblue',
            }),
            $(go.Shape, {
                geometryString: 'M3.5 7 L3.5 30',
                isGeometryPositioned: true,
                stroke: 'deepskyblue',
                strokeWidth: 1.5,
                strokeDashArray: [4, 2],
            }),
        )
        // define display selection when select a arrow link
        const linkSelectionAdornmentTemplate = $(
            go.Adornment,
            'Link',
            $(go.Shape, {
                isPanelMain: true,
                fill: null,
                stroke: 'deepskyblue',
                strokeWidth: 0,
            }),
        )
        // define 4 dot link arrow
        const makePort = (
            name: string,
            spot: go.Spot,
            output: boolean,
            input: boolean,
            margin = new go.Margin(0),
        ): any => {
            // the port is basically just a small transparent circle
            return $(go.Shape, 'Circle', {
                fill: null, // not seen, by default; set to a translucent gray by showSmallPorts, defined below
                stroke: null,
                desiredSize: new go.Size(7, 7),
                alignment: spot, // align the port on the main Shape
                alignmentFocus: spot, // just inside the Shape
                portId: name, // declare this object to be a "port"
                fromSpot: spot,
                toSpot: spot, // declare where links may connect at this port
                fromLinkable: output,
                toLinkable: input, // declare whether the user may draw links to/from here
                cursor: 'pointer', // show a different cursor to indicate potential link point
                margin: margin,
            })
        }
        // show dot link when hover
        const showSmallPorts = (node: any, show: boolean) => {
            node.ports.each((port: { portId: string; fill: string | null }) => {
                if (port.portId !== '') {
                    port.fill = show ? 'rgba(0,0,0,.3)' : null
                }
            })
        }
        // define screen diagram
        const dia = new go.Diagram({
            'undoManager.isEnabled': true,
            'draggingTool.isEnabled': true,
            padding: new go.Margin(100, 0, 0, 0),
            model: new go.GraphLinksModel({
                nodeKeyProperty: 'id',
                linkKeyProperty: 'key',
            }),
            nodeTemplateMap: new go.Map<string, go.Node>(),
            grid: $(
                go.Panel,
                'Grid',
                $(go.Shape, 'LineH', { stroke: 'lightgray', strokeWidth: 0.5 }),
                $(go.Shape, 'LineH', {
                    stroke: 'gray',
                    strokeWidth: 0.5,
                    interval: 10,
                }),
                $(go.Shape, 'LineV', { stroke: 'lightgray', strokeWidth: 0.5 }),
                $(go.Shape, 'LineV', {
                    stroke: 'gray',
                    strokeWidth: 0.5,
                    interval: 10,
                }),
            ),
            'draggingTool.dragsLink': true,
            'draggingTool.isGridSnapEnabled': true,
            'linkingTool.isUnconnectedLinkValid': true,
            'linkingTool.portGravity': 20,
            'relinkingTool.isUnconnectedLinkValid': true,
            'relinkingTool.portGravity': 20,
            'relinkingTool.fromHandleArchetype': $(go.Shape, 'Diamond', {
                segmentIndex: 0,
                cursor: 'pointer',
                desiredSize: new go.Size(8, 8),
                fill: 'tomato',
                stroke: 'darkred',
            }),
            'relinkingTool.toHandleArchetype': $(go.Shape, 'Diamond', {
                segmentIndex: -1,
                cursor: 'pointer',
                desiredSize: new go.Size(8, 8),
                fill: 'darkred',
                stroke: 'tomato',
            }),
            'linkReshapingTool.handleArchetype': $(go.Shape, 'Diamond', {
                desiredSize: new go.Size(7, 7),
                fill: 'lightblue',
                stroke: 'deepskyblue',
            }),
            'rotatingTool.handleAngle': 270,
            'rotatingTool.handleDistance': 30,
            'rotatingTool.snapAngleMultiple': 15,
            'rotatingTool.snapAngleEpsilon': 15,
        })
        dia.addDiagramListener('Modified', () => {
            this.isSaveButton = !dia.isModified
            const idx = document.title.indexOf('*')
            if (dia.isModified) {
                if (idx < 0) document.title += '*'
            } else {
                if (idx >= 0) document.title = document.title.slice(0, idx)
            }
        })
        // define node can draw in diagram screen
        dia.nodeTemplate = $(
            go.Node,
            'Spot',
            { locationSpot: go.Spot.Center },
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            {
                selectable: true,
                selectionAdornmentTemplate: nodeSelectionAdornmentTemplate,
            },
            {
                resizable: true,
                resizeObjectName: 'PANEL',
                resizeAdornmentTemplate: nodeResizeAdornmentTemplate,
            },
            {
                rotatable: true,
                rotateAdornmentTemplate: nodeRotateAdornmentTemplate,
            },
            {
                doubleClick: function (e, obj: any) {
                    const node = obj.part
                    if (node.data.category === 'Image') {
                        const input = document.createElement('input')
                        input.type = 'file'
                        input.accept = 'image/*'
                        input.onchange = (event) => {
                            const target = event.target // Không cần chuyển đổi kiểu ngay lập tức
                            if (target instanceof HTMLInputElement) {
                                // Kiểm tra kiểu
                                const file = target.files?.[0] // Sử dụng optional chaining
                                if (file) {
                                    const reader = new FileReader()
                                    reader.onload = (e) => {
                                        const imgSrc = e.target?.result // Kiểm tra e.target có phải null không
                                        if (imgSrc) {
                                            // Thay đổi node thành hình ảnh mới
                                            const picture = node?.findObject('PICTURE') as go.Picture
                                            dia.startTransaction('Change Image Source')
                                            if (picture) {
                                                picture.source = imgSrc as string // Chuyển đổi imgSrc về kiểu string
                                            }
                                            dia.commitTransaction('Change Image Source')
                                        }
                                    }
                                    reader.readAsDataURL(file) // Đọc ảnh dưới dạng Data URL
                                }
                            }
                        }
                        input.click() // Mở hộp thoại chọn file
                    } else {
                        // Xử lý cho Shape ở đây
                        const textBlock = node.findObject('TEXT') as go.TextBlock
                        dia.commandHandler.editTextBlock(textBlock) // "TEXT" là tên của TextBlock
                    }
                },
            },
            new go.Binding('angle').makeTwoWay(),
            $(
                go.Panel,
                'Auto',
                { name: 'PANEL' },
                new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify),
                $(
                    go.Shape,
                    'Rectangle',
                    {
                        name: 'SHAPE',
                        portId: '',
                        fromLinkable: true,
                        toLinkable: true,
                        cursor: 'pointer',
                        strokeWidth: 2,
                    },
                    new go.Binding('figure').makeTwoWay(),
                    new go.Binding('fill').makeTwoWay(),
                    new go.Binding('stroke').makeTwoWay(),
                ),
                $(
                    go.TextBlock,
                    {
                        name: 'TEXT',
                        margin: 8,
                        maxSize: new go.Size(160, NaN),
                        minSize: new go.Size(50, NaN),
                        wrap: go.Wrap.Fit,
                        editable: true,
                    },
                    new go.Binding('text').makeTwoWay(),
                    new go.Binding('font').makeTwoWay(),
                    new go.Binding('stroke', 'textStroke').makeTwoWay(),
                ),
            ),
            $(
                go.Panel,
                'Auto',
                $(
                    go.Picture,
                    {
                        name: 'PICTURE', // Tên hình ảnh
                        scale: 1, // Tỉ lệ mặc định
                        imageStretch: go.ImageStretch.Uniform,
                        background: 'transparent',
                    },
                    new go.Binding('source', 'source').makeTwoWay(),
                    new go.Binding('width', 'width').makeTwoWay(),
                    new go.Binding('height', 'height').makeTwoWay(),
                ),
                new go.Shape({
                    name: 'TRANSPARENT_SHAPE',
                    fill: null,
                    stroke: null,
                }).bind('desiredSize', 'size', go.Size.parse),
            ),
            makePort('T', go.Spot.Top, true, true),
            makePort('L', go.Spot.Left, true, true),
            makePort('R', go.Spot.Right, true, true),
            makePort('B', go.Spot.Bottom, true, true),
            {
                mouseEnter: (e, node) => showSmallPorts(node, true),
                mouseLeave: (e, node) => showSmallPorts(node, false),
            },
        )
        const stickFigureTemplate = $(
            go.Node,
            'Spot',
            { locationSpot: go.Spot.Center },
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            {
                selectable: true,
                selectionAdornmentTemplate: nodeSelectionAdornmentTemplate,
            },
            $(go.Shape, 'Rectangle', {
                fill: 'transparent',
                stroke: null,
                cursor: 'pointer',
                alignment: go.Spot.Center,
                desiredSize: new go.Size(35, 70),
            }),
            $(
                go.Panel,
                'Vertical',
                $(go.Shape, 'Circle', {
                    fill: 'white',
                    // stroke: 'black',
                    desiredSize: new go.Size(20, 20),
                }),
                $(go.Shape, {
                    stroke: 'black',
                    strokeWidth: 2,
                    geometryString: 'M -15 10 L 15 10',
                    alignment: go.Spot.Center,
                }),
                $(
                    go.Panel,
                    'Horizontal',
                    $(go.Shape, {
                        stroke: 'black',
                        strokeWidth: 2,
                        geometryString: 'M 0 0 V 20',
                        alignment: go.Spot.Center,
                    }),
                ),
                $(
                    go.Panel,
                    'Horizontal',
                    $(go.Shape, {
                        stroke: 'black',
                        strokeWidth: 2,
                        geometryString: 'M 0 30 L -10 40',
                        alignment: go.Spot.Center,
                    }),
                    $(go.Shape, {
                        stroke: 'black',
                        strokeWidth: 2,
                        geometryString: 'M 0 30 L 10 40',
                        alignment: go.Spot.Center,
                    }),
                ),
            ),
            makePort('T', go.Spot.Top, true, true),
            makePort('L', go.Spot.Left, true, true),
            makePort('R', go.Spot.Right, true, true),
            makePort('B', go.Spot.Bottom, true, true),
            {
                mouseEnter: (e, node) => showSmallPorts(node, true),
                mouseLeave: (e, node) => showSmallPorts(node, false),
            },
        )
        dia.nodeTemplateMap.add('stickman', stickFigureTemplate)
        const textFigureTemplate = $(
            go.Node,
            'Auto',
            { locationSpot: go.Spot.Center },
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            $(
                go.TextBlock,
                {
                    name: 'TEXT',
                    margin: 8,
                    maxSize: new go.Size(160, NaN),
                    minSize: new go.Size(50, NaN),
                    wrap: go.Wrap.Fit,
                    editable: true,
                },
                new go.Binding('text').makeTwoWay(),
                new go.Binding('stroke', 'textStroke').makeTwoWay(),
                new go.Binding('font').makeTwoWay(),
            ),
        )
        dia.nodeTemplateMap.add('TextIcon', textFigureTemplate)
        // Cập nhật dữ liệu sau khi thay đổi kích thước
        dia.addDiagramListener('PartResized', function (e) {
            const node = e.subject.part
            if (node.$o === 'Image' && node instanceof go.Node) {
                const picture = node.findObject('PICTURE')
                if (picture instanceof go.Picture) {
                    const model = picture.diagram?.model
                    const newSize = go.Size.parse(node.data.size)
                    model?.setDataProperty(node.data, 'width', newSize.width)
                    model?.setDataProperty(node.data, 'height', newSize.height)
                }
            }
        })
        // define arrow link
        dia.linkTemplate = $(
            go.Link,
            {
                selectable: true,
                selectionAdornmentTemplate: linkSelectionAdornmentTemplate,
            },
            { relinkableFrom: true, relinkableTo: true, reshapable: true, resegmentable: true },
            {
                routing: go.Routing.AvoidsNodes,
                curve: go.Curve.JumpOver,
                corner: 5,
                toShortLength: 4,
            },
            new go.Binding('points').makeTwoWay(),
            $(go.Shape, { isPanelMain: true, strokeWidth: 2 }),
            $(go.Shape, { toArrow: 'Standard', stroke: null }),
            $(
                go.Panel,
                'Auto',
                $(go.Shape, 'RoundedRectangle', {
                    fill: 'rgb(255 255 255 / 75%)',
                    stroke: null,
                }),
                $(
                    go.TextBlock,
                    {
                        name: 'LINK_TEXT',
                        textAlign: 'center',
                        font: '10pt helvetica, arial, sans-serif',
                        stroke: 'black',
                        margin: 2,
                        minSize: new go.Size(10, NaN),
                        editable: true,
                    },
                    new go.Binding('text').makeTwoWay(),
                ),
            ),
        )
        return dia
    }
    public initPalette(): go.Palette {
        const $ = go.GraphObject.make
        const palette = new go.Palette()
        palette.padding = new go.Margin(100, 0, 0, 0)
        palette.maxSelectionCount = 1
        palette.layout = new go.GridLayout({
            wrappingColumn: 1,
            cellSize: new go.Size(1, 1),
        })
        // Template mặc định cho node thông thường
        palette.nodeTemplate = new go.Node('Auto')
            .add(
                new go.Shape({ stroke: 'black' }).bind('fill', 'fill').bind('figure', 'figure'),
                new go.TextBlock({ margin: 8 }).bind('text', 'text'),
            )
            .bind('desiredSize', 'size', go.Size.parse)
        // Template node picture
        palette.nodeTemplateMap.add(
            'Image',
            new go.Node('Auto').add(
                new go.Picture({
                    name: 'PICTURE',
                    scale: 1,
                    imageStretch: go.ImageStretch.UniformToFill,
                    desiredSize: new go.Size(50, 40),
                }).bind('source', 'source'),
                new go.Shape({
                    name: 'TRANSPARENT_SHAPE',
                    fill: null,
                    stroke: null,
                    desiredSize: new go.Size(50, 40),
                }),
            ),
        )
        palette.nodeTemplateMap.add(
            'stickman',
            $(
                go.Node,
                'Spot',
                $(go.Shape, 'Rectangle', {
                    fill: 'transparent',
                    stroke: null,
                    cursor: 'pointer',
                    alignment: go.Spot.Center,
                    desiredSize: new go.Size(35, 70),
                }),
                $(
                    go.Panel,
                    'Vertical',
                    $(go.Shape, 'Circle', {
                        fill: 'white',
                        desiredSize: new go.Size(20, 20),
                    }),
                    $(go.Shape, {
                        stroke: 'black',
                        strokeWidth: 2,
                        geometryString: 'M -15 10 L 15 10',
                        alignment: go.Spot.Center,
                    }),
                    $(
                        go.Panel,
                        'Horizontal',
                        $(go.Shape, {
                            stroke: 'black',
                            strokeWidth: 2,
                            geometryString: 'M 0 0 V 20',
                            alignment: go.Spot.Center,
                        }),
                    ),
                    $(
                        go.Panel,
                        'Horizontal',
                        $(go.Shape, {
                            stroke: 'black',
                            strokeWidth: 2,
                            geometryString: 'M 0 30 L -10 40',
                            alignment: go.Spot.Center,
                        }),
                        $(go.Shape, {
                            stroke: 'black',
                            strokeWidth: 2,
                            geometryString: 'M 0 30 L 10 40',
                            alignment: go.Spot.Center,
                        }),
                    ),
                ),
            ),
        )
        palette.nodeTemplateMap.add(
            'TextIcon',
            $(
                go.Node,
                'Spot',
                $(
                    go.Panel,
                    'Auto',
                    $(go.Picture, {
                        name: 'TEXT_ICON',
                        scale: 1,
                        imageStretch: go.ImageStretch.UniformToFill,
                        width: 35,
                        height: 35,
                        source: nodeDiagram.textIcon,
                    }).bind('text', 'text'),
                    new go.Shape({
                        name: 'TRANSPARENT_SHAPE',
                        fill: null,
                        stroke: null,
                    }),
                ),
            ),
        )
        return palette
    }
    handleConvertDataNodeSelected() {
        this.convertedNodeData.id = this.state.selectedNodeData.id
        if (this.state.selectedNodeData.text) {
            this.convertedNodeData.text = this.state.selectedNodeData.text
        }
        if (this.state.selectedNodeData.fill) {
            this.convertedNodeData.backgroundColor = this.state.selectedNodeData.fill
        }
        if (this.state.selectedNodeData.textStroke) {
            this.convertedNodeData.textColor = this.state.selectedNodeData.textStroke
        }
        if (this.state.selectedNodeData.font) {
            const parts = this.state.selectedNodeData.font.split(' ')
            const style = parts[0]
            const sizeWithUnit = parts[1]
            const size = sizeWithUnit.replace('pt', '')
            const fontFamily = parts.slice(2).join(' ')
            const sizeOption = textFontSize.find((item) => item.code === size) || {
                name: '',
                code: '',
            }
            this.convertedNodeData.textStyle.push(style)
            this.convertedNodeData.textFontSize = sizeOption
            const fontOption = textFont.find((item) => item.code === fontFamily) || {
                name: '',
                code: '',
            }
            this.convertedNodeData.textFont = fontOption
        }
    }
    public ngAfterViewInit() {
        if (this.observedDiagram || !this.myDiagramComponent) return console.warn('this.myDiagramComponent not found!')
        this.observedDiagram = this.myDiagramComponent.diagram
        this.cdr.detectChanges()

        // listener for inspector
        this.myDiagramComponent.diagram.addDiagramListener('ChangedSelection', (e) => {
            if (e.diagram.selection.count === 0) {
                this.selectedNodeData = null
            }
            const node = e.diagram.selection.first()
            this.state = produce(this.state, (draft) => {
                if (node instanceof go.Node) {
                    const idx = draft.diagramNodeData.findIndex((nd: any) => nd.id == node.data.id)
                    const nd = draft.diagramNodeData[idx]
                    draft.selectedNodeData = nd
                } else {
                    draft.selectedNodeData = {
                        id: null,
                        text: '',
                        fill: null,
                        stroke: null,
                        size: null,
                        textStroke: null,
                        font: '',
                        category: undefined,
                    }
                    this.convertedNodeData = {
                        id: null,
                        text: '',
                        textStyle: [],
                        textFont: {
                            name: '',
                            code: '',
                        },
                        textFontSize: {
                            name: '',
                            code: '',
                        },
                        textColor: Colors.black,
                        backgroundColor: Colors.while,
                    }
                }
            })
            this.handleConvertDataNodeSelected()
        })
    }
    ngOnInit(): void {
        this.nameDiagram.setValue(this.diagramData.name)
        if (this.diagramData.dataNode) {
            this.state.diagramNodeData = [...JSON.parse(this.diagramData.dataNode)]
        }
        if (this.diagramData.dataLink) {
            const convertLink = JSON.parse(this.diagramData.dataLink).map((data: any) => {
                let points
                if (data.points.h) {
                    points = data.points.h.map((point: PointData) => new go.Point(point.S, point.P))
                } else if (data.points.r) {
                    points = data.points.r.map((point: IPointDataP) => new go.Point(point.b, point.k))
                } else {
                    points = data.points.map((point: any) => {
                        if (point.b) {
                            return new go.Point(point.b, point.k)
                        } else {
                            return new go.Point(point.S, point.P)
                        }
                    })
                }
                return {
                    key: data.key,
                    from: data.from,
                    to: data.to,
                    points: points,
                }
            })
            this.state.diagramLinkData = [...convertLink]
        }
        this.cdr.detectChanges()
    }
    nameValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const forbidden = regexNameDiagram.test(control.value as string)
            return forbidden ? { invalidName: { value: control.value } } : null
        }
    }
    onChangeTextNodeSelected(event: Event) {
        const input = event.target as HTMLInputElement
        this.state = produce(this.state, (draft) => {
            const data = draft.selectedNodeData
            data['text'] = input.value
            const key = data.id
            const idx = draft.diagramNodeData.findIndex((nd) => nd.id == key)
            if (idx >= 0) {
                draft.diagramNodeData[idx] = data
                draft.skipsDiagramUpdate = false
            }
        })
        this.cdr.detectChanges()
    }
    onChangeTextSizeNodeSelected(event: DropdownChangeEvent) {
        this.state = produce(this.state, (draft) => {
            const data = draft.selectedNodeData
            const fontString =
                this.convertedNodeData.textStyle.join(' ') +
                ' ' +
                event.value.code +
                'pt' +
                ' ' +
                this.convertedNodeData.textFont.code
            data['font'] = fontString
            const key = data.id
            const idx = draft.diagramNodeData.findIndex((nd) => nd.id == key)
            if (idx >= 0) {
                draft.diagramNodeData[idx] = data
                draft.skipsDiagramUpdate = false
            }
        })
        this.cdr.detectChanges()
    }
    onChangeTextStyleNodeSelected() {
        this.state = produce(this.state, (draft) => {
            const data = draft.selectedNodeData
            const fontString =
                this.convertedNodeData.textStyle.join(' ') +
                ' ' +
                this.convertedNodeData.textFontSize.code +
                'pt' +
                ' ' +
                this.convertedNodeData.textFont.code
            data['font'] = fontString
            const key = data.id
            const idx = draft.diagramNodeData.findIndex((nd) => nd.id == key)
            if (idx >= 0) {
                draft.diagramNodeData[idx] = data
                draft.skipsDiagramUpdate = false
            }
        })
        this.cdr.detectChanges()
    }
    onChangeTextFontNodeSelected(event: DropdownChangeEvent) {
        this.state = produce(this.state, (draft) => {
            const data = draft.selectedNodeData
            const fontString =
                this.convertedNodeData.textStyle.join(' ') +
                ' ' +
                this.convertedNodeData.textFontSize.code +
                'pt' +
                ' ' +
                event.value.code
            data['font'] = fontString
            const key = data.id
            const idx = draft.diagramNodeData.findIndex((nd) => nd.id == key)
            if (idx >= 0) {
                draft.diagramNodeData[idx] = data
                draft.skipsDiagramUpdate = false
            }
        })
        this.cdr.detectChanges()
    }
    onChangeTextColorNodeSelected(event: ColorPickerChangeEvent) {
        this.state = produce(this.state, (draft) => {
            const data = draft.selectedNodeData
            data['textStroke'] = event.value as string
            const key = data.id
            const idx = draft.diagramNodeData.findIndex((nd) => nd.id == key)
            if (idx >= 0) {
                draft.diagramNodeData[idx] = data
                draft.skipsDiagramUpdate = false
            }
        })
        this.cdr.detectChanges()
    }
    onChangeBackgroundColorNodeSelected(event: ColorPickerChangeEvent) {
        this.state = produce(this.state, (draft) => {
            const data = draft.selectedNodeData
            data['fill'] = event.value as string
            const key = data.id
            const idx = draft.diagramNodeData.findIndex((nd) => nd.id == key)
            if (idx >= 0) {
                draft.diagramNodeData[idx] = data
                draft.skipsDiagramUpdate = false
            }
        })
        this.cdr.detectChanges()
    }
    onClickEditNameDiagram() {
        this.editName.emit()
    }
    onClickSaveNameDiagram() {
        if (this.nameDiagram.valid) {
            this.saveNameDiagram.emit(this.nameDiagram.value)
        }
    }
    onClickSaveDiagram() {
        const imageExport = this.myDiagramComponent.diagram.makeImageData({
            background: 'white',
            scale: 1,
        }) as string
        this.saveDiagram.emit({
            name: this.nameDiagram.value,
            image: imageExport,
            dataNode: this.state.diagramNodeData,
            dataLink: this.state.diagramLinkData,
        })
    }
    onCancel() {
        this.cancel.emit()
    }
}
