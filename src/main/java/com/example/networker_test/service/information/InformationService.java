package com.example.networker_test.service.information;

import com.example.networker_test.domain.information.Information;
import com.example.networker_test.repository.imformation.InformationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InformationService {

    private final InformationRepository informationRepository;

    public InformationService(InformationRepository informationRepository) {
        this.informationRepository = informationRepository;
    }
    public List<Information> getInformation() {
        saveInformation();
        return informationRepository.findAll();
    }

    public void saveInformation() {
        informationRepository.save(new Information("창원시, 외국인 주민 언어지원 통·번역 서비스 도입", "https://www.newsis.com/view/NISX20240722_0002820820"
                , "경남 창원시는 외국인 주민에 대한 행정 서비스 만족도 향상을 위해\n" +
                "              8월부터 언어 지원 통·번역 서비스를 운영한다고 22일 밝혔다. 이번에\n" +
                "              도입된 통·번역기는 18대로 의창·성산구(4대 팔룡동, 봉림동, 중앙동,\n" +
                "              반송동), 합포·회원구(5대 월영동, 진동면, 봉암동, 합성2동,\n" +
                "              구암2동), 진해구(1대 웅동2동) 시·구청 민원실(6대 각 1대),\n" +
                "              인구정책담당관(2대)에서 시범 운영한다.", "../src/assets/healthcheck.png"));
        informationRepository.save(new Information("경기소방, 이주노동자 위한 13개 국어 '안전관리 3종 홍보물' 제작", "https://www.edaily.co.kr/News/Read?newsId=03125846638957472&mediaCodeNo=257&OutLnkChk=Y",
                "경기도소방재난본부가 아리셀 화재와 같은 참사를 막기 위해\n" +
                        "              이주노동자들의 화재예방과 비상시 대피 등 화재안전수칙을 각 나라의\n" +
                        "              언어로 담은 음원과 포스터, 영상(숏폼) 등 ‘안전관리 3종 홍보\n" +
                        "              콘텐츠’를 제작했다", "../src/assets/industrialsafety.png"));
        informationRepository.save(new Information("외국인 대상 '주말은행'…전용 상품에 수수료 우대도", "https://www.sportsworldi.com/newsView/20240723514703",
                "안산·김해 등 외국인 노동자 밀집지역서 특화 영업점 운영 중 비대면\n" +
                        "              계좌개설, 다국어 서비스 제공…특정 조건 충족 시 우대금리 제공\n" +
                        "              특화상품도", "../src/assets/koreanclass.png"));
        informationRepository.save(new Information("강원도내 외국인 노동자 ‘지역경제 소비파워’ 확대", "https://www.kado.net/news/articleView.html?idxno=1256427",
                " 지난해와 비교해 외국인노동자 카드 소비가 가장 많이 늘은 업종은\n" +
                        "              마트·편의점 등 유통업(28%)이었다. 이어 생활(가구·보건·주방용품)\n" +
                        "              12%, 주유 11% 음식 10% 등 순으로 증가율이 높았다.", "../src/assets/workshop.png"));

        informationRepository.save(new Information("음식점 외국인노동자 고용 문턱 더 낮춘다", "ttps://www.labortoday.co.kr/news/articleView.html?idxno=222683",
                "다음달 5일부터 업종은 한식에서 외국식으로 확대되고, 업력 요건은\n" +
                        "              5년 이상, 5명 미만 사업장으로 변경된다. 노동계는 “노동조건이\n" +
                        "              열악한 5명 미만 사업장을 이주노동자들로 채우겠다는 것”이라고\n" +
                        "              비판했다. 정부는 19일 오후 외국인력정책위원회를 열고 이같이\n" +
                        "              결정했다.", "../src/assets/financialeducation.png"));
        informationRepository.save(new Information("진주시, 전국 세 번째 규모 외국인 계절노동자 배정", "https://www.sedaily.com/NewsView/2DBRGDWK0T",
                "참여농가는 노동자 신청 시 결혼이민자와 함께 신청을 해야 하며, 적정\n" +
                        "              주거환경을 갖춘 숙소 제공, 최저임금 이상의 급여 지급, 휴일 보장\n" +
                        "              등을 준수해 외국인 노동자에 대한 인권보호를 시행해야 한다.", "../src/assets/teambuilding.png"));
        informationRepository.save(new Information("농식품부, 하반기 계절근로 외국인 근로자 1.6만명 추가 배정", "https://www.newsis.com/view/NISX20240717_0002814282",
                " 농협이 외국인 노동자를 고용해 농가에 일일 단위로 공급하는 공공형\n" +
                        "              계절근로는 지난해 19개소에서 올해 70개소로 3배 이상 확대한다. 5월\n" +
                        "              기준으론 2500여명이 계절근로자가 현장에서 활동하고 있는 것으로\n" +
                        "              집계됐다.", "../src/assets/jobconsulting.png"));
    }
    }
