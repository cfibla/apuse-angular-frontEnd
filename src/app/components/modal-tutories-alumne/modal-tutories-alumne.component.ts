import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-tutories-alumne',
  templateUrl: './modal-tutories-alumne.component.html',
  styles: []
})
export class ModalTutoriesAlumneComponent implements OnInit {

  closeModal: string;

  constructor( private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  obrirTutoriesModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-dades-alumne'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
      console.log(this.closeModal);
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      console.log(this.closeModal);
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
