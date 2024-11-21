package com.example.labseq.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/labseq")
public class LabSeqController {

    // Cache interno para armazenar os resultados calculados
    private final Map<Integer, Long> cache = new HashMap<>();

    // Endpoint que retorna o valor da sequência para o índice n
    @GetMapping("/{n}")
    public long getLabSeq(@PathVariable int n) {
        if (n < 0) {
            throw new IllegalArgumentException("Index must be a non-negative integer.");
        }
        return calculateLabSeq(n);
    }

    // Método que realiza o cálculo da sequência
    private long calculateLabSeq(int n) {
        // Verifica se o valor já foi calculado e está no cache
        if (cache.containsKey(n)) {
            return cache.get(n);  // Retorna o valor do cache
        }

        // Caso base, diretamente definido
        if (n == 0) return 0;
        if (n == 1) return 1;
        if (n == 2) return 0;
        if (n == 3) return 1;

        // Para n > 3, calcula o valor utilizando os valores anteriores
        long valNMinus4 = calculateLabSeq(n - 4);
        long valNMinus3 = calculateLabSeq(n - 3);
        long result = valNMinus4 + valNMinus3;

        // Armazena o resultado no cache para uso futuro
        cache.put(n, result);

        return result;
    }
}
