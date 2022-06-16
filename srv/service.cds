using  my.sigfoxv2 as my from '../db/schema';

service CatalogService {
    entity Status as projection on my.Status;
    entity Reporte as projection on my.Reporte;
    entity Evento as projection on my.Evento;

    action postData(
        device: String,
        dist: String,
        caudal: String,
        rele: String
    );
}

