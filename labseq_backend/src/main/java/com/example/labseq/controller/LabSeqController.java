package com.example.labseq.controller;

import com.example.labseq.service.LabSeqService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/labseq")
public class LabSeqController {

    private final LabSeqService labSeqService;

    // Injeção de dependência do serviço
    public LabSeqController(LabSeqService labSeqService) {
        this.labSeqService = labSeqService;
    }

    // Endpoint que retorna o valor da sequência para o índice n
    @GetMapping("/{n}")
    public long getLabSeq(@PathVariable int n) {
        if (n < 0) {
            throw new IllegalArgumentException("Index must be a non-negative integer.");
        }
        return labSeqService.calculateLabSeq(n);  // Delegação da lógica para o Service
    }
}
