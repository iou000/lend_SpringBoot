package com.weedkim.lend.react404;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class react404Controller implements ErrorController { //spa앱 새로고침시 404에러 처리

    //404에러나올시 index.html로 맵핑
    @GetMapping({"/","/error"})
    public String index() {
        return "index.html";
    }

    @Override
    public String getErrorPath() {
        return "/error";
    }

}
