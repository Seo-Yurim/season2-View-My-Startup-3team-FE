import styles from './About.module.css';

export default function About() {
  return (
    <div className={styles.aboutContainer}>
      <h1>프로젝트 소개</h1>
      <section>
        <h2>1. 프로젝트 개요</h2>
        <p>
          본 프로젝트는 Codeit FS 2기 교육과정으로 진행된 스타트업 정보 제공 및 모의 투자 플랫폼입니다.
        </p>
        <p>
          사용자들이 스타트업을 비교하고 모의 투자를 통해 시장 분석과 예측을 경험할 수 있도록 설계되었습니다.
          <br />
          이 프로젝트는 실제 투자 없이도 가상의 투자 환경에서 스타트업의 성장을 체험할 수 있도록 돕는 것을 목표로 합니다.
        </p>
        <p>
          최근 개인 투자자들의 스타트업에 대한 관심이 증가함에 따라, 스타트업 정보에 대한 접근성을 개선하고,
          가상의 투자 환경에서 다양한 분석과 비교를 경험할 수 있는 서비스입니다.
        </p>
      </section>

      <section>
        <h2>2. 주요 기능</h2>
        <ul>
          <li>스타트업 관련 정보 조회</li>
          <li>스타트업 비교 기능</li>
          <li>모의 투자 기능</li>
          <li>사용자 세션을 기반으로 한 맞춤형 비교 정보 제공</li>
          <li>비교 기업 선택 및 비교 현황 조회</li>
          <li>가상 투자 및 투자 내역 수정, 삭제</li>
        </ul>
      </section>

      <section>
        <h2>3. 사용 기술 스택</h2>
        <p>이 프로젝트는 최신 웹 기술을 활용하여 개발되었습니다.</p>
        <ul>
          <li>프론트엔드: React.js</li>
          <li>백엔드: Node.js, Express</li>
          <li>데이터베이스: PostgreSQL</li>
          <li>스타일링: CSS Modules</li>
          <li>배포: Netlify, Render</li>
        </ul>
      </section>

      <section>
        <h2>4. 프로젝트의 특징 및 장점</h2>
        <ol>
          <li>
            <strong>트랜잭션 처리를 통한 데이터 무결성 유지</strong>
            <p>
              <span>
              투자 시 기업의 누적 투자 금액과 개인의 투자 내역을 트랜잭션으로 처리하여 데이터의 불일치를 방지하고
              동시성 제어를 강화했습니다.
              </span>
            </p>
          </li>
          <li>
            <strong>세션 기반의 기업 비교 정보 유지</strong>
            <p>
              <span>
              브라우저를 닫기 전까지 사용자의 기업 비교 정보를 세션을 통해 지속적으로 유지합니다.
              </span>
            </p>
          </li>
          <li>
            <strong>동순위 항목에 대한 완벽한 정렬 구현</strong>
            <p>
              <span>
              매번 API 요청 시 동일한 결과를 보장하여 데이터의 일관성을 유지합니다.
              </span>
            </p>
          </li>
          <li>
            <strong>숫자 데이터의 가독성 향상</strong>
            <p>
              <span>
              투자 금액, 매출액 등의 숫자에 3자리마다 콤마를 삽입하여 읽기 쉽도록 표시합니다.
              (투자 금액 입력 시에도 실시간 적용)
              </span>
            </p>
          </li>
          <li>
            <strong>모바일 환경에서의 안정적인 레이아웃 제공</strong>
            <p>
              <span>
              텍스트 버튼, 검색창, 드롭다운 메뉴 등이 모바일 화면에서도 깨지지 않고 정상적으로 표시됩니다.
              </span>
            </p>
          </li>
          <li>
            <strong>사용자 편의성을 높인 입력 방식</strong>
            <p>
              <span>
              팝업창이 뜰 때 입력 창에 자동으로 포커스되며, 데이터 입력 후 버튼 클릭 없이 엔터 키를 눌러
              해당 프로세스를 수행할 수 있도록 사용자 편의성을 증대시켰습니다.
              </span>
            </p>
          </li>
        </ol>
      </section>

      <section>
        <h2>5. 개발 팀 정보</h2>
        <p>본 프로젝트는 Codeit FS 2기 Part2 3팀이 개발했습니다.</p>
        <ul>
          <li>팀장: 이도엽</li>
          <li>팀원: 김은효, 소재희, 서유림, 서지우</li>
        </ul>
      </section>
    </div>
  );
}
