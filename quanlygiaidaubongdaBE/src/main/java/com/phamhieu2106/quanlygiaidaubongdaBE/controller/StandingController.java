//package com.phamhieu2106.quanlygiaidaubongdaBE.controller;
//
//import com.phamhieu2106.quanlygiaidaubongdaBE.dto.request.StandingRequest;
//import com.phamhieu2106.quanlygiaidaubongdaBE.service.StandingService;
//import jakarta.validation.Valid;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.*;
//
//import java.io.IOException;
//
//@Controller
//@CrossOrigin
//@RequestMapping("api/standings")
//public class StandingController implements IController<ResponseEntity<?>, StandingRequest> {
//
//    private final StandingService standingService;
//
//    @Autowired
//    public StandingController(StandingService standingService) {
//        super();
//        this.standingService = standingService;
//    }
//
//    @Override
//    @GetMapping
//    public ResponseEntity<?> getAll() {
//        return ResponseEntity.ok(standingService.getAll());
//    }
//
//    @Override
//    @GetMapping("/{id}")
//    public ResponseEntity<?> getOne(@PathVariable("id") Long id) {
//        return ResponseEntity.ok(standingService.getOne(id));
//    }
//
//    @Override
//    @PostMapping
//    public ResponseEntity<?> add(@Valid @RequestBody StandingRequest object) throws IOException {
//        return ResponseEntity.ok(standingService.add(object));
//    }
//
//    @Override
//    @PutMapping("/{id}")
//    public ResponseEntity<?> update(@PathVariable("id") Long id
//            , @Valid @RequestBody StandingRequest object) throws IOException {
//        return ResponseEntity.ok(standingService.update(id, object));
//    }
//
//    @Override
//    public ResponseEntity<?> remove(Long id) {
//        return null;
//    }
//}
