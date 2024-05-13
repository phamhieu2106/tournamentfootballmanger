package com.phamhieu2106.quanlygiaidaubongdaBE.controller;

import java.io.IOException;

public interface IResource<RE, RQ> {

    RE getAll();

    RE getOne(Long id);

    RE add(RQ object) throws IOException;

    RE update(Long id, RQ object) throws IOException;

    RE remove(Long id);
}
