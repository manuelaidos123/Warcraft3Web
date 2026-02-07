import { useParallaxLayers } from "../hooks/useParallax";

export function StoryPage() {
  const { bgRef, contentRef, bgOffset, contentOffset, opacity } = useParallaxLayers();

  return (
    <div className="story-page">
      <section className="page-hero parallax-hero" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #2d1a4e 50%, #16213e 100%)" }}>
        <div className="parallax-bg" ref={bgRef} style={{ transform: `translateY(${bgOffset}px)` }}>
          <div className="parallax-decoration parallax-runes">
            <span style={{ left: "10%", top: "20%", animationDelay: "0s" }}>✦</span>
            <span style={{ left: "85%", top: "30%", animationDelay: "1.5s" }}>◆</span>
            <span style={{ left: "25%", top: "70%", animationDelay: "3s" }}>✧</span>
            <span style={{ left: "70%", top: "60%", animationDelay: "0.8s" }}>✦</span>
          </div>
        </div>
        <div className="container parallax-content" ref={contentRef} style={{ transform: `translateY(${contentOffset}px)`, opacity }}>
          <h1 className="page-hero-title">The Story of Warcraft III</h1>
          <p className="page-hero-subtitle">An epic saga of heroes, betrayal, and the battle for Azeroth</p>
        </div>
      </section>

      <div className="container main-content-inner">
        {/* Prologue */}
        <section className="story-section">
          <h2 className="section-title">Prologue: The Prophecy</h2>
          <div className="story-block">
            <div className="story-block-icon"><i className="fas fa-scroll" aria-hidden="true"></i></div>
            <div className="story-block-content">
              <p>
                The story of Warcraft III begins with a dire prophecy delivered by the mysterious Prophet — later revealed 
                to be the resurrected Medivh, the Last Guardian of Tirisfal. He warns the leaders of Azeroth that a great 
                evil is coming — the Burning Legion, a vast demonic army bent on the destruction of all life.
              </p>
              <p>
                While some heed his warnings, others dismiss them as madness. This sets the stage for a conflict 
                that will reshape the world forever.
              </p>
            </div>
          </div>
        </section>

        {/* Reign of Chaos */}
        <section className="story-section" id="reign-of-chaos">
          <h2 className="section-title">Reign of Chaos</h2>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker" style={{ background: "#2f89fc" }}></div>
              <div className="timeline-content">
                <div className="timeline-badge" style={{ background: "#2f89fc22", color: "#2f89fc" }}>
                  <i className="fas fa-shield-alt" aria-hidden="true"></i> Human Campaign
                </div>
                <h3>The Scourge of Lordaeron</h3>
                <p>
                  Prince Arthas Menethil investigates a mysterious plague spreading across Lordaeron. 
                  Accompanied by Jaina Proudmoore and guided by Uther the Lightbringer, he discovers that 
                  the plague transforms its victims into undead. His pursuit of justice becomes increasingly 
                  desperate, leading him to purge the infected city of Stratholme against Uther's wishes.
                </p>
                <p>
                  Arthas then pursues the dreadlord Mal'Ganis to the frozen continent of Northrend, where 
                  he finds the cursed runeblade Frostmourne. The blade grants him power but claims his soul, 
                  transforming him into a Death Knight in service of the Lich King. He returns to Lordaeron 
                  and murders his own father, King Terenas.
                </p>
                <div className="story-key-moment">
                  <i className="fas fa-exclamation-triangle" aria-hidden="true"></i>
                  <strong>Key Moment:</strong> The Culling of Stratholme — Arthas' fateful decision to purge 
                  an entire city, the point of no return in his descent into darkness.
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker" style={{ background: "#c41e3a" }}></div>
              <div className="timeline-content">
                <div className="timeline-badge" style={{ background: "#c41e3a22", color: "#c41e3a" }}>
                  <i className="fas fa-fist-raised" aria-hidden="true"></i> Orc Campaign
                </div>
                <h3>The Departure</h3>
                <p>
                  Thrall, the young Warchief of the New Horde, receives a vision from Medivh urging him 
                  to sail west to Kalimdor. Leading the orcs, trolls, and newly allied Tauren across the 
                  Great Sea, Thrall forges bonds with Cairne Bloodhoof and the Darkspear tribe.
                </p>
                <p>
                  On Kalimdor, Grom Hellscream falls under demonic influence after drinking from a tainted 
                  fountain, rampaging through the forest and killing the demigod Cenarius. Thrall and Jaina 
                  work together to free Grom, who then sacrifices himself to slay the demon lord Mannoroth, 
                  breaking the blood curse that had enslaved the orcs for generations.
                </p>
                <div className="story-key-moment">
                  <i className="fas fa-exclamation-triangle" aria-hidden="true"></i>
                  <strong>Key Moment:</strong> Grom's sacrifice — "The blood haze has lifted... the demons' 
                  curse on our people is over."
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker" style={{ background: "#10b981" }}></div>
              <div className="timeline-content">
                <div className="timeline-badge" style={{ background: "#10b98122", color: "#10b981" }}>
                  <i className="fas fa-moon" aria-hidden="true"></i> Night Elf Campaign
                </div>
                <h3>Eternity's End</h3>
                <p>
                  Tyrande Whisperwind and Malfurion Stormrage must rally the Night Elves against the 
                  invading Burning Legion. Tyrande awakens Malfurion from his centuries-long Emerald Dream 
                  and frees Illidan from his ten-thousand-year prison, hoping his power can aid them.
                </p>
                <p>
                  However, Illidan consumes the power of the Skull of Gul'dan, transforming into a demon 
                  hybrid. Though he destroys the dreadlord Tichondrius, he is banished by Malfurion for 
                  his reckless embrace of demonic power.
                </p>
                <div className="story-key-moment">
                  <i className="fas fa-exclamation-triangle" aria-hidden="true"></i>
                  <strong>Key Moment:</strong> The Battle of Mount Hyjal — Humans, orcs, and night elves 
                  unite for the first time to defend the World Tree from Archimonde and the Burning Legion. 
                  Malfurion detonates the World Tree, destroying Archimonde at the cost of the Night Elves' immortality.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Frozen Throne */}
        <section className="story-section" id="frozen-throne">
          <h2 className="section-title">The Frozen Throne</h2>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker" style={{ background: "#10b981" }}></div>
              <div className="timeline-content">
                <div className="timeline-badge" style={{ background: "#10b98122", color: "#10b981" }}>
                  <i className="fas fa-eye" aria-hidden="true"></i> Sentinel Campaign
                </div>
                <h3>Terror of the Tides</h3>
                <p>
                  Maiev Shadowsong pursues the escaped Illidan across the sea. Illidan allies with Lady 
                  Vashj and the Naga, seeking artifacts of immense power. Malfurion and Tyrande join the 
                  hunt, but Tyrande falls into a river during a battle and is swept away.
                </p>
                <p>
                  Illidan, in an unexpected act of compassion for his former love, helps rescue Tyrande. 
                  Malfurion allows him to leave, but warns him never to threaten the Night Elves again. 
                  Illidan departs through a portal to Outland.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker" style={{ background: "#c41e3a" }}></div>
              <div className="timeline-content">
                <div className="timeline-badge" style={{ background: "#c41e3a22", color: "#c41e3a" }}>
                  <i className="fas fa-skull" aria-hidden="true"></i> Alliance Campaign
                </div>
                <h3>Curse of the Blood Elves</h3>
                <p>
                  Prince Kael'thas Sunstrider leads the remnants of the High Elves, now calling themselves 
                  Blood Elves in memory of their fallen kin. Desperate for a cure to their magical addiction, 
                  Kael'thas allies with Illidan and Lady Vashj in Outland after being imprisoned by the 
                  racist human commander Garithos.
                </p>
                <p>
                  Together, they battle across Outland and ultimately defeat Magtheridon, the Pit Lord who 
                  ruled the shattered world. Illidan claims Outland as his domain, but fears the wrath of 
                  his master Kil'jaeden, who tasked him with destroying the Frozen Throne.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker" style={{ background: "#8b5cf6" }}></div>
              <div className="timeline-content">
                <div className="timeline-badge" style={{ background: "#8b5cf622", color: "#8b5cf6" }}>
                  <i className="fas fa-chess-king" aria-hidden="true"></i> Undead Campaign
                </div>
                <h3>Legacy of the Damned</h3>
                <p>
                  Arthas returns to Lordaeron to find Sylvanas Windrunner and the Dreadlords plotting 
                  against him. Weakened as the Lich King's power wanes, Arthas fights through civil war 
                  among the undead. Sylvanas breaks free and establishes the Forsaken.
                </p>
                <p>
                  Arthas journeys to Northrend to save the Lich King, battling Illidan's forces in a 
                  race to Icecrown Glacier. In an epic duel, Arthas defeats Illidan and ascends the 
                  Frozen Throne. He shatters the ice prison and dons the Helm of Domination, merging 
                  with Ner'zhul to become the new Lich King.
                </p>
                <div className="story-key-moment">
                  <i className="fas fa-exclamation-triangle" aria-hidden="true"></i>
                  <strong>Key Moment:</strong> The Ascension — "Now, we are one." Arthas merges with 
                  the Lich King, completing his tragic transformation from noble prince to lord of the undead.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Legacy */}
        <section className="story-section">
          <h2 className="section-title">Legacy</h2>
          <div className="story-block">
            <div className="story-block-icon"><i className="fas fa-landmark" aria-hidden="true"></i></div>
            <div className="story-block-content">
              <p>
                Warcraft III's story is widely regarded as one of the greatest narratives in gaming history. 
                Its themes of corruption, redemption, sacrifice, and the blurred lines between heroism and 
                villainy continue to resonate with players decades later.
              </p>
              <p>
                The events of Warcraft III directly set the stage for World of Warcraft, with major story 
                arcs like the rise of the Lich King, the founding of Durotar, and Illidan's exile to 
                Outland becoming central to the MMO's expansions.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
