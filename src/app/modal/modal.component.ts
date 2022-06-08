import { Component, OnInit } from '@angular/core';
import {ModalService} from "./modal.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {

  constructor(private readonly service: ModalService) { }

  ngOnInit(): void {
  }

  close() {
    this.service.closeModal()
  }

}
