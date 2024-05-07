package com.phamhieu2106.quanlygiaidaubongdaBE.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface IService <M,RQ,RP>{

    List<RP> getAll();

    RP getOne(Long id);

    M add(RQ object) throws IOException;

    M update(Long id,RQ object) throws IOException;

    M remove(Long id);
}
