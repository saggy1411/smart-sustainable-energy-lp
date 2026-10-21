import sys

path = r'c:/xampp/htdocs/WORKPLACE/office work/sspu landing pages/cybersecurity/index.html'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

OLD_START = '          <!-- CARD 2: WHY THIS PROGRAM NOW? -->'
end_marker = '</div>\n</div>\n  \n<div class="col-lg-4">'

start_idx = content.find(OLD_START)
end_idx = content.find(end_marker, start_idx)

# The OLD block is from start_idx to end_idx (we keep the end_marker as it starts the NEXT col)
old_block = content[start_idx:end_idx]
print("OLD block length:", len(old_block))

NEW_BLOCK = '''          <!-- CARD 2: 70:30 APPLIED LEARNING MODEL -->
<div class="col-lg-4">
  <div class="learn-model-card h-100 d-flex flex-column">
    <!-- Header -->
    <div class="lm-header d-flex justify-content-between align-items-start mb-1">
      <div>
        <h4 class="lm-title">Cyber Security Salary Range Growth (India)</h4>
        <p class="lm-subtitle">Share of curriculum delivery</p>
      </div>
      <span class="lm-badge">18% GROWTH</span>
    </div>

    <!-- Chart Area -->
    <div class="lm-chart-area flex-grow-1">
      <!-- Dotted grid lines -->
      <div class="lm-grid">
        <div class="lm-gridline"></div>
        <div class="lm-gridline"></div>
        <div class="lm-gridline"></div>
        <div class="lm-gridline"></div>
      </div>
      <!-- Bars -->
      <div class="lm-bars">
        <div class="lm-bar-group">
          <span class="lm-pct">20 LPA</span>
          <div class="lm-bar lm-bar--red" style="--h:25%"></div>
          <span class="lm-bar-label">Fresh<br>(0&#8209;2 yrs)</span>
        </div>
        <div class="lm-bar-group">
          <span class="lm-pct">50 LPA</span>
          <div class="lm-bar lm-bar--red lm-bar--mid" style="--h:62%"></div>
          <span class="lm-bar-label">Mid<br>(3&#8209;7 yrs)</span>
        </div>
        <div class="lm-bar-group">
          <span class="lm-pct">80 LPA</span>
          <div class="lm-bar lm-bar--dark" style="--h:100%"></div>
          <span class="lm-bar-label">Senior<br>(8+ yrs)</span>
        </div>
      </div>
      <!-- Baseline -->
      <div class="lm-baseline"></div>
    </div>

    <!-- Footer Legend -->
    <div class="lm-footer d-flex justify-content-between mt-3">
      <span class="lm-legend"><i class="lm-dot lm-dot--red"></i> Entry level.</span>
      <span class="lm-legend"><i class="lm-dot lm-dot--grey"></i> Senior level.</span>
    </div>
  </div>
</div>'''

new_content = content[:start_idx] + NEW_BLOCK + content[end_idx:]

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Done! File updated.")
