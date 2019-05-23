<template>
    <section class="AGN-content">
    <figure class="breakdown-box" style="background-image: url(./article.png);">
        <div class="content-container">
        <div class="blurb-container">
            <div class="score-text">
                {{remarkStr}}
            </div>
            <div class="blurb">
                <svg class="blurb-arrow" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <path d="M87.391,50L59.009,21.538c-0.428-0.428-0.8-0.784-1.103-1.066c-2.042-1.857-4.643-2.347-6.822-0.364
                            c-2.349,2.138-2.16,5.052-0.094,7.277c0.281,0.309,0.634,0.678,1.066,1.106l16.766,16.766H19.203c-1.527,0-3.214-0.095-4.558,0.752
                            c-1.386,0.874-2.036,2.392-2.036,3.991c0,1.598,0.648,3.124,2.036,3.996c1.346,0.845,3.029,0.751,4.558,0.751h49.613L52.05,71.513
                            c-0.431,0.428-0.784,0.8-1.066,1.106c-1.954,2.126-2.299,4.901-0.141,7.059c2.188,2.188,4.891,1.806,7.056-0.141
                            c0.303-0.281,0.678-0.638,1.103-1.066L87.391,50z"></path>
                </svg>
                {{commentStr}}
            </div>
            <div class="byline">
                <span class="publish-date">2019年2月22日</span>
                <span class="reviewer">AGN测评员</span>
            </div>
        </div>
            </div>
    <div class="score-wrapper">
        <span class="score-hex-bg hexagon-wrapper">
            <span class="hexagon"></span>
        </span>
        <span class="score-hex hexagon-wrapper">
            <span class="hexagon"></span>
        </span>
        <span class="score">
            <span>
                {{scoreStr}}
            </span>
        </span>
    </div>
    </figure>
</section>
</template>

<script>
function remark(score) {
  if(!Number.isFinite(score)) return '未评分';
  if(score == 10) return '大师之作';
  if(score > 9) return '奇佳';
  if(score > 8) return '卓越';
  if(score > 7) return '优秀';
  if(score > 6) return '尚可';
  if(score > 5) return '平庸';
  if(score > 4) return '劣质';
  if(score > 3) return '极差';
  if(score > 2) return '痛苦体验';
  if(score > 1) return '无法忍受';
  return '灾难';
}

function comment(score) {
  if(!Number.isFinite(score)) return '未评分';
  if(score == 10) return '简而言之，这是我们的最高推荐分。没有真正完美的爽文，但被AGN评为大师之作的爽文是接近完美的典范。这类爽文会成为经典，AGN也希望它们会影响未来的爽文写作，成为其他爽文作者引航灯塔。';
  if(score > 9) return '我们强烈推荐您将奇佳爽文加入您的爽文列表。如果我们认定某款爽文奇佳，那代表它的某一点强烈打动了我们，可能是创新的理念，或是已有概念的杰出演绎。我们期望回顾这款爽文时，它会是同一时期和类型之中的上乘佳作。';
  if(score > 8) return '这类爽文的精彩之处令其为人铭记，通常是单人或多人写法新颖，角色和叙事出众，画面及音效出彩，或兼而有之。如果爽文尚有不成熟之处，通常其优点已经足以掩盖其缺陷了。';
  if(score > 7) return '值得花时间读一款优秀爽文。爽文还可以改进吗？当然。优秀爽文可能格局不够，或过于重复，有点技术问题，但读过之后我们还是很开心的。我们相信你也会有相同感受。';
  if(score > 6) return '尚可意味着爽文有很多不足。闪光点还是有的，但读者需要一定的指引更容易发现闪光点，同时还需要对某些重大缺陷视而不见。';
  if(score > 5) return '这类爽文平淡无奇，多数情况下读过一天之后就会忘记。如果您珍视自己的时间或金钱的话，就不推荐购买或读平庸爽文，但闲着打发时间还可以。';
  if(score > 4) return '出于种种原因，我们希望自己从没读过这类爽文。即便其中可能有一两处闪光点，却也已经被众多缺陷和糟糕表现所掩盖，我们不推荐您在这类爽文上浪费时间。';
  if(score > 3) return '不用客气。我们拯救了您，让您不会错买这类粗制滥造、毫无创新的极差爽文，免费读也不值得。劣质爽文通常还有某些优点，但极差爽文一无是处。';
  if(score > 2) return '不得不说，任何比劣质评级更低的爽文都令人不忍卒视。比极差更糟糕？要达到这水平也很不容易呀。这类爽文不仅毫无趣味性，而且简直令人愤怒，甚至是对读者的侮辱。';
  if(score > 1) return '这类爽文的一线希望在于，如果爽文还读得起来的话，读到一定程度会自动结束，因此我们的大脑也不会因为这款烂爽文遭到永久性创伤。我们不会对所有这类爽文花时间做测评，但它们确实存在。';
  return '史上最烂爽文之一。很少有爽文得分如此之低，因为1以下的低评分是留给完全没有逻辑的烂爽文或是纯骗局型爽文，要得到灾难级评价也不容易。如果有歌颂纳粹的爽文，大概也会被列入灾难等级。';
}

export default {
  name: 'HelloWorld',
  props: {
    score: Number,
    backgroundImage: String,
    comment: String,
  },
  computed: {
    scoreStr() {
      if(!Number.isFinite(this.score)) return 'N/A';
      return this.score.toFixed(1);
    },
    remarkStr() {
      return remark(this.score);
    },
    commentStr() {
      if(this.comment) return this.comment;
      return comment(this.score);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.AGN-content {
    font-family: sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    overflow: visible;
}

a:active, a:hover {
    outline: 0
}

a:link, a:visited {
    text-decoration: none
}

b, strong {
    font-weight: bold
}

h1 {
    font-size: 2em;
    margin: .67em 0
}

small {
    font-size: 80%
}

figure {
    margin: 0
}

svg:not(:root) {
    overflow: hidden
}

.breakdown-box {
    width: 840px;
    float: left;
    background-size: cover;
    background-position: top left;
    position: relative;
    min-height: 320px
}

.breakdown-box .content-container {
    background-color: var(--trans-color);
    width: 54%;
    float: right;
    color: #fff;
    box-sizing: border-box;
    border-left: 1px solid var(--border-color);
    min-height: 320px
}

.breakdown-box .content-container .score-text {
    font-size: 3.1em;
    line-height: 1em;
    text-transform: uppercase;
    color: #fff;
    font-weight: 900
}

.breakdown-box .content-container .blurb {
    color: #fff;
    line-height: 1.42em;
    font-size: 1em;
    margin-top: .85em;
    padding-left: .1em;
    position: relative
}

.breakdown-box .content-container .byline {
    color: #fff;
    text-transform: uppercase;
    line-height: 1em;
    font-size: .764em;
    padding: 1em 0 0 .2em
}

.breakdown-box .content-container .byline a {
    color: #fff
}

.breakdown-box .content-container .byline .publish-date {
    color: rgba(255, 255, 255, 0.69);
    padding: 0 0 0 5px
}

.breakdown-box .content-container .byline .reviewer {
    padding: 0 0 0 5px
}

.breakdown-box .content-container .pros-cons-container {
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: var(--border-color);
    color: #fff;
    line-height: 1.11em;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    display: table
}

.breakdown-box .blurb-container {
    padding: 4.5em 3.5em 1.2em;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.breakdown-box .blurb-arrow {
    fill: #fff;
    width: .9em;
    position: absolute;
    left: -1.5em;
    top: .29em
}

.breakdown-box .hexagon-wrapper {
    text-align: center;
    position: relative;
    display: inline-block;
    -webkit-transform: rotate(30deg);
    transform: rotate(30deg)
}

.breakdown-box .hexagon {
    height: 100%;
    width: 57.735%;
    display: inline-block
}

.breakdown-box .hexagon:before, .breakdown-box .hexagon:after {
    position: absolute;
    top: 0;
    right: 21.13255%;
    background-color: inherit;
    height: inherit;
    width: inherit;
    content: '';
    -webkit-transform: rotate(60deg);
    transform: rotate(60deg)
}

.breakdown-box .hexagon:after {
    -webkit-transform: rotate(-60deg);
    transform: rotate(-60deg)
}

.breakdown-box .score-wrapper {
    position: absolute;
    bottom: 6.6em;
    left: 1.33em
}

.breakdown-box .score-wrapper > span {
    position: absolute
}

.breakdown-box .score-hex-bg {
    width: 8.9em;
    height: 8.9em
}

.breakdown-box .score-hex-bg > span {
    background-color: #fff
}

.breakdown-box .score-hex {
    width: 7.9em;
    height: 7.9em;
    left: .54em;
    top: .5em
}

.breakdown-box .score-hex > span {
    background-color: var(--main-color)
}

.breakdown-box .score {
    color: #fff;
    display: block;
    letter-spacing: -0.033em;
    line-height: 8.9em;
    text-align: center;
    top: .25em;
    width: 8.9em
}

.breakdown-box .score span {
    font-size: 4.529em
}

.breakdown-box .score-container {
    position: absolute;
    bottom: -0.3em;
    left: 1.33em
}

</style>
