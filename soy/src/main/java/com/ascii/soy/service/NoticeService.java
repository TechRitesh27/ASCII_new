package com.ascii.soy.service;

import com.ascii.soy.entity.Notice;
import com.ascii.soy.entity.NoticeType;
import com.ascii.soy.repository.NoticeRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class NoticeService {

    private final NoticeRepository noticeRepo;

    private static final String UPLOAD_DIR = "uploads/notices/";

    public NoticeService(NoticeRepository noticeRepo) {
        this.noticeRepo = noticeRepo;
    }

    public Notice createNotice(
            Notice notice,
            MultipartFile image
    ) throws IOException {

        notice.setCreatedAt(LocalDateTime.now());

        if (image != null && !image.isEmpty()) {

            Path uploadPath = Paths.get(UPLOAD_DIR);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String fileName = UUID.randomUUID()
                    + "_" + image.getOriginalFilename();

            Path filePath = uploadPath.resolve(fileName);

            Files.copy(
                    image.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING
            );

            // ✅ store filename only
            notice.setImagePath(fileName);
        }

        return noticeRepo.save(notice);
    }

    public List<Notice> getActiveNotices() {
        return noticeRepo.findByEndDateAfter(LocalDateTime.now());
    }

    public void deleteNotice(Long id) {

        Notice notice = noticeRepo.findById(id).orElse(null);

        if (notice != null && notice.getImagePath() != null) {

            Path filePath = Paths.get(UPLOAD_DIR + notice.getImagePath());

            try {
                Files.deleteIfExists(filePath);
            } catch (IOException ignored) {}
        }

        noticeRepo.deleteById(id);
    }
}
