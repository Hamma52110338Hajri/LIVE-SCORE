import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function HomeScreen() {
  const [matchesByCountry, setMatchesByCountry] = useState([]);
  const [openCountry, setOpenCountry] = useState(null);
  const [openLeague, setOpenLeague] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://cms.bettorlogic.com/api/BetBuilder/GetFixtures?sports=1');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // Organize matches by country and league
        const matchesGroupedByCountry = groupMatchesByCountry(data);
        setMatchesByCountry(matchesGroupedByCountry);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const groupMatchesByCountry = matches => {
    const matchesByCountry = {};
    matches.forEach(match => {
      const { Country, LeagueName } = match;
      if (!matchesByCountry[Country]) {
        matchesByCountry[Country] = {};
      }
      if (!matchesByCountry[Country][LeagueName]) {
        matchesByCountry[Country][LeagueName] = [];
      }
      matchesByCountry[Country][LeagueName].push(match);
    });
    return matchesByCountry;
  };

  const toggleCountry = country => {
    setOpenCountry(openCountry === country ? null : country);
    setOpenLeague(null);
  };

  const toggleLeague = league => {
    setOpenLeague(openLeague === league ? null : league);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>FootBall</Text>
      {Object.entries(matchesByCountry).map(([country, leagues]) => (
        <View key={country} style={styles.countryContainer}>
          <TouchableOpacity onPress={() => toggleCountry(country)}>
            <Text style={styles.countryHeader}>{country}</Text>
          </TouchableOpacity>
          {openCountry === country && Object.entries(leagues).map(([league, matches]) => (
            <View key={league} style={styles.leagueContainer}>
              <TouchableOpacity onPress={() => toggleLeague(league)}>
                <Text style={styles.leagueName}>{league}</Text>
              </TouchableOpacity>
              {openLeague === league && matches && matches.map(match => (
                <View key={match.MatchId} style={styles.matchDetails}>
                  <Text style={styles.matchName}>{match.MatchName}</Text>
                  <Text>Kickoff Time: {match.KickOffUtc}</Text>
                  <Text>Team 1: {match.Team1Name}</Text>
                  <Text>Team 2: {match.Team2Name}</Text>
                  <Text>MatchId : {match.MatchId}</Text>
                  <Text>LeagueId : {match.LeagueId}</Text>




                </View>
              ))}
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fcfcfc',
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  countryContainer: {
    marginBottom: 20,
  },
  countryHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textDecorationLine: 'underline',
    color: '#00a0d2',
  },
  leagueContainer: {
    marginLeft: 10,
    marginTop: 10,
  },
  leagueName: {
    fontWeight: 'bold',
    color: '#000',
  },
  matchDetails: {
    marginLeft: 10,
    marginTop: 5,
  },
  matchName: {
    fontStyle: 'italic',
    color: 'red',
  },
  foot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
