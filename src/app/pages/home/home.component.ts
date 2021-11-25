import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CongresspersonService } from 'src/app/services/congressperson.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

interface IcongresspersonsDetail {
  nameCivil: string;
  photo: string;
  initialsPoliticalParty: string;
  state: string;
  birhtDate: string;
  gender: string;
  email: string;
  webSite: string;
  schooling: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  congresspersons: Array<any> = [];
  congresspersonDetailsList!: any;
  congresspersonDetails: IcongresspersonsDetail;
  modalRef?: BsModalRef;
  totalLength: number;
  page = 1;
  pageSize = 10;
  constructor(private congresspersonService: CongresspersonService, private modalService: BsModalService) {}

  ngOnInit() {
    this.showAllCongressperson();
  }

  showAllCongressperson() {
    this.congresspersonService.getAllCongressperson().subscribe(
      (res) => {
        this.congresspersons = res['dados'];
        this.totalLength = res['dados'].length;
      },
      (error) => console.log(error),
    );
  }

  showOneCongresspersonDetails(id, template) {
    this.congresspersonService.getOneCongressperson(id).subscribe(
      (res) => {
        this.congresspersonDetailsList = res;
        let congressperson = this.congresspersonDetailsList['dados'];
        this.congresspersonDetails = {
          nameCivil: congressperson.nomeCivil,
          photo: congressperson.ultimoStatus.urlFoto,
          state: congressperson.ultimoStatus.siglaUf,
          initialsPoliticalParty: congressperson.ultimoStatus.siglaPartido,
          birhtDate: congressperson.dataNascimento,
          email: congressperson.ultimoStatus.email,
          gender: congressperson.sexo,
          schooling: congressperson.escolaridade,
          webSite: congressperson.urlWebsite,
        };
        this.openModal(template);
      },
      (error) => console.log(error),
    );
  }

  // configuração modal
  openModal(modalCongresspersonDetails: TemplateRef<any>) {
    this.modalRef = this.modalService.show(modalCongresspersonDetails);
  }
}
