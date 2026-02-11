package com.ascii.soy.repository;

import com.ascii.soy.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

    List<Notice> findByEndDateAfter(LocalDateTime now);
}
