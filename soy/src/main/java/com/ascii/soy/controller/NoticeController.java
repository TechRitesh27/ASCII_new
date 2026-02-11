package com.ascii.soy.controller;

import com.ascii.soy.entity.Notice;
import com.ascii.soy.entity.NoticeType;
import com.ascii.soy.service.NoticeService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/notices")
@CrossOrigin(origins = "http://localhost:5173")
public class NoticeController {

    private final NoticeService noticeService;

    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    @PostMapping(consumes = "multipart/form-data")
    public Notice create(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam NoticeType noticeType,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            @RequestParam(required = false) MultipartFile image
    ) throws IOException {

        Notice notice = new Notice();
        notice.setTitle(title);
        notice.setDescription(description);
        notice.setNoticeType(noticeType);

        if (startDate != null)
            notice.setStartDate(LocalDateTime.parse(startDate));

        if (endDate != null)
            notice.setEndDate(LocalDateTime.parse(endDate));

        return noticeService.createNotice(notice, image);
    }

    @GetMapping("/active")
    public List<Notice> getActive() {
        return noticeService.getActiveNotices();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        noticeService.deleteNotice(id);
    }
}
