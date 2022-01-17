import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";
import {Product} from "../models/product.model";

import {ProductService} from "./product.service";

describe("ProductService", () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  const mockData = {
    hits: [
      {
        id: 911,
        name: "Angelica",
        scientificName: "Angelica keiskei",
        groupId: 132,
        subGroupId: 133
      }
    ],
    total: 1
  };

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [ProductService], imports: [HttpClientTestingModule]});

    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it("getProducts should make a GET HTTP request and return data items", () => {
    service.getProducts(25, 0, "", "", "DESC").subscribe((res : any) => {
      expect(res).toEqual(mockData);
      expect(res.hits.length).toBe(1);
    });

    const req = httpTestingController.expectOne("api/products/v1.0/?size=25&from=0&includes=&keywords=&order=DESC");
    expect(req.request.method).toBe("GET");
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual("json");
    req.flush(mockData);
    httpTestingController.verify();
  });

  it("update should make a PUT HTTP request with id appended to end of url and resource as body", () => {
    const updateObj: Product = {
      id: 911,
      name: "Savoy",
      scientificName: "Angelica keiskei",
      groupId: 132,
      subGroupId: 133
    };
    service.updateProduct(updateObj).subscribe((res) => {
      expect(res.id).toBe(911);
      expect(res.name).toBe("Savoy");
      expect(res.scientificName).toBe("Angelica keiskei");
      expect(res.groupId).toBe(132);
      expect(res.subGroupId).toBe(133);
    });

    const req = httpTestingController.expectOne("api/products/v1.0/911");
    expect(req.request.method).toBe("PUT");
    expect(req.request.body).toBe(updateObj);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual("json");
    req.flush(updateObj);
    httpTestingController.verify();
  });

  it("create should make a POST HTTP request with resource as body", () => {
    const createObj: Product = {
      id: 0,
      name: "Test",
      scientificName: "Test Test",
      groupId: 132,
      subGroupId: 133
    };
    service.addProduct(createObj).subscribe((res) => {
      expect(res.name).toBe("Test");
      expect(res.scientificName).toBe("Test Test");
      expect(res.groupId).toBe(132);
      expect(res.subGroupId).toBe(133);
    });

    const req = httpTestingController.expectOne("api/products/v1.0/");
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toBe(createObj);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual("json");
    req.flush(createObj);
    httpTestingController.verify();
  });

  it("delete should make a DELETE HTTP request with id appended to end of url", () => {
    service.deleteProduct(1).subscribe((res : any) => {
      expect(res).toBe(1);
    });
    const req = httpTestingController.expectOne("api/products/v1.0/1");
    expect(req.request.method).toBe("DELETE");
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual("json");
    req.flush(1);
    httpTestingController.verify();
  });
});
