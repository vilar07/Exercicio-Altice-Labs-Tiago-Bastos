package com.example.labseq.service;

import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.Map;

@Service
public class LabSeqService {

    // Cache interno para armazenar os resultados calculados
    private final Map<Integer, BigInteger> cache = new HashMap<>();

    public BigInteger calculateLabSeq(int n) {
        // Verifica se o valor já foi calculado e está no cache
        if (cache.containsKey(n)) {
            return cache.get(n); 
        }

        // Caso base, diretamente definido
        if (n == 0) return BigInteger.ZERO;
        if (n == 1) return BigInteger.ONE;
        if (n == 2) return BigInteger.ZERO;
        if (n == 3) return BigInteger.ONE;

        // Para n > 3, calcula o valor utilizando os valores anteriores
        BigInteger valNMinus4 = calculateLabSeq(n - 4);
        BigInteger valNMinus3 = calculateLabSeq(n - 3);
        BigInteger result = valNMinus4.add(valNMinus3);

        // Armazena o resultado no cache para uso futuro
        cache.put(n, result);

        return result;
    }
}
