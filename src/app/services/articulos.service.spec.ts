import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArticulosService } from './articulos.service';
import { HttpClient } from '@angular/common/http';

describe('ArticulosService', () => {
  let service: ArticulosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importamos el módulo de pruebas HTTP
      providers: [ArticulosService], // Proveemos el servicio
    });
    service = TestBed.inject(ArticulosService);
    httpMock = TestBed.inject(HttpTestingController); // Para interceptar las peticiones HTTP
  });

  afterEach(() => {
    httpMock.verify(); // Verificar que no haya peticiones pendientes
  });

  it('debe ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debe obtener artículos', () => {
    const mockArticulos = {
      status: 'ok',
      totalResults: 38,
      articles: [
        {
          source: { id: 'the-washington-post', name: 'The Washington Post' },
          author: 'Tony Romm',
          title: 'Debt ceiling vote in Senate to be blocked by Republicans',
          description: 'The GOP\'s expected opposition is sure to deal a death blow...',
          url: 'https://www.washingtonpost.com/us-policy/2021/09/27/senate-debt-ceiling-government-shutdown/',
          urlToImage: 'https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/RUHMA7A4VEI6ZPVIGCHKCNCZJ4.jpg&w=1440',
          publishedAt: '2021-09-27T14:40:20Z',
          content: 'Ahead of the planned Monday vote...',
        },
      ],
    };

    service.getArticulos().subscribe(articulos => {
      expect(articulos.length).toBe(1);
      expect(articulos[0].title).toBe('Debt ceiling vote in Senate to be blocked by Republicans');
    });

    const req = httpMock.expectOne('assets/datos/articulos.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockArticulos); // Devolvemos la respuesta mockeada
  });
});
