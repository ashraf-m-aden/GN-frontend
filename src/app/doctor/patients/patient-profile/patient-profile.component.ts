import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';

import { NzTreeFlatDataSource, NzTreeFlattener } from 'ng-zorro-antd/tree-view';

interface FoodNode {
  name: string;
  disabled?: boolean;
  id: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Consultation',
    id: "1",
    children: [{ name: 'GN', id: "11" }, { name: 'Externe', id: "12" },
    { name: 'Consulter', id: "13" }]
  },
  {
    name: 'Exploration',
    id: "2",
    children: [
      {
        name: 'Biologique',
        id: "21",
        children: [{ name: 'Hemathologie', id: "211" }, { name: 'Biochimie', id: "212" }]
      },
      {
        name: 'Radiologique',
        id: "22",
        children: [{ name: 'Standard', id: "221" }, { name: 'TDM', id: "222" }, { name: 'IRM', id: "223" }]
      }
    ]
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  id: string;
  level: number;
  disabled: boolean;
}

@Component({
  selector: "app-patient-profile",
  templateUrl: "./patient-profile.component.html",
  styleUrls: ["./patient-profile.component.scss"],
})
export class PatientProfileComponent implements AfterViewInit {
  @Output() type = new EventEmitter<string>();
  private transformer = (node: FoodNode, level: number): ExampleFlatNode => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    id: node.id,
    level,
    disabled: !!node.disabled
  })

  // tslint:disable-next-line:member-ordering
  selectListSelection = new SelectionModel<ExampleFlatNode>();

  // tslint:disable-next-line:member-ordering
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable
  );

  // tslint:disable-next-line:member-ordering
  treeFlattener = new NzTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  // tslint:disable-next-line:member-ordering
  dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.setData(TREE_DATA);
  }

  hasChild = (_: number, node: ExampleFlatNode): boolean => node.expandable;

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   // tslint:disable-next-line:no-non-null-assertion
    //   this.treeControl.expand(this.getNode('Exploration')!);
    // }, 300);
  }

  getNode(name: string): ExampleFlatNode | null {
    return this.treeControl.dataNodes.find(n => n.name === name) || null;
  }

  test(content) {
    this.type.emit(content);

  }
}

