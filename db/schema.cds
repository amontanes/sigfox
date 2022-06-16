namespace my.sigfoxv2;
using {cuid, managed} from '@sap/cds/common';

entity Status: cuid, managed {
    device: String;
    dist: Double;
    caudal: Double;
    rele: Boolean;
}

entity Reporte: cuid, managed {
    dev1_dist: Double;
    dev1_caudal: Double;
    dev1_rele: Boolean;
    dev2_dist: Double;
    dev2_caudal: Double;
    dev2_rele: Boolean;
    dev3_dist: Double;
    dev3_caudal: Double;
    dev3_rele: Boolean;
}

entity Evento: cuid, managed {
    tipo: String;
    descripcion: String;
}