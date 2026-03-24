import { Selector } from 'testcafe';

fixture('Wikipedia Random Page Test')
  .page('https://en.wikipedia.org/wiki/Special:Random');

test('Read first Wikipedia title', async (t) => {
  const heading = Selector('#firstHeading');

  const firstWikipediaTitle = (await heading.innerText).trim();
  console.log('First title:', firstWikipediaTitle);

  await t.expect(firstWikipediaTitle.length).gt(0);
});

const getFirstValidLink = async (t) => {
  const content = Selector('#mw-content-text');
  await t.expect(content.exists).ok({ timeout: 10000 });

  const firstValidLink = content
    .find('p a')
    .filter((node) => {
      return (
        !node.closest('i') &&
        !node.closest('sup') &&
        !node.closest('.infobox') &&
        node.getAttribute('href')?.startsWith('/wiki/')
      );
    })
    .nth(0);

  await t.expect(firstValidLink.exists).ok({ timeout: 10000 });
  return firstValidLink;
};

test('Follow first Wikipedia links until Philosophy or loop', async (t) => {
  const heading = Selector('#firstHeading');
  const visitedTitles = new Set();
  const maxSteps = 30;

  for (let step = 0; step < maxSteps; step += 1) {
    await t.expect(heading.exists).ok({ timeout: 10000 });

    const currentTitle = (await heading.innerText).trim();
    console.log(`Step ${step + 1}: ${currentTitle}`);

    if (currentTitle === 'Philosophy') {
      await t.expect(currentTitle).eql('Philosophy');
      return;
    }

    if (visitedTitles.has(currentTitle)) {
      await t.expect(false).ok(`Loop detected at article: ${currentTitle}`);
      return;
    }

    visitedTitles.add(currentTitle);

    const firstValidLink = await getFirstValidLink(t);
    await t.click(firstValidLink);
  }

  await t.expect(false).ok('Did not reach Philosophy within the maximum step limit.');
});